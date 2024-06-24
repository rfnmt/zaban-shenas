#!/bin/bash

# Initialize variables with default values

# Initialize variables with default values
BASE_URL=""
PRODUCTION_URL="https://portainer-webhook.s4.zabanshenas.com/smart-deploy"
STAGING_URL="https://portainer-webhook.staging.s4.zabanshenas.com/smart-deploy"

NEW_IMAGE_ADDRESS=""
ENV="staging"  # Default environment
STACK_NAME=""
# AUTH_TOKEN=""
TEMPLATE=""
TEMPLATE_PATH=""
IMAGE_GROUP=""

# Parse command-line arguments
while [[ $# -gt 0 ]]; do
  key="$1"

  case $key in
    --new_image_address)
      NEW_IMAGE_ADDRESS="$2"
      shift # Skip argument value
      ;;
    --image_group)
      IMAGE_GROUP="$2"
      shift # Skip argument value
      ;;
    --env)
      ENV="$2"
      shift # Skip argument value
      ;;
    --stack_name)
      STACK_NAME="$2"
      shift # Skip argument value
      ;;
    --template_path)
      TEMPLATE_PATH="$2"
      shift # Skip argument value
      ;;
    # --auth-token)
    #   AUTH_TOKEN="$2"
    #   shift # Skip argument value
    #   ;;
    *)
      echo "Unknown option $key"
      exit 1
      ;;
  esac
  shift # Move to the next argument
done



# Set BASE_URL based on the selected environment
if [ "$ENV" == "staging" ]; then
  BASE_URL="$STAGING_URL"
elif [ "$ENV" == "production" ]; then
  BASE_URL="$PRODUCTION_URL"
else
  echo "Error: Invalid environment specified. Use --env staging or --env production."
  exit 1
fi

# Check if the required arguments are provided
if [ -z "$IMAGE_GROUP" ] || [ -z "$NEW_IMAGE_ADDRESS" ] || [ -z "$STACK_NAME" ] || [ -z "$ENV" ] || [ -z "$AUTH_TOKEN" ]; then
  echo "Usage: $0 --image_group <image_group> --new_image_address <new_image_address> --stack_name <stack_name> [--env <staging/production>] [--auth-token <auth-token>]"
  exit 1
fi

# Prepare JSON for environment variables
skip_prefixes=("CI_" "FF_" "GITLAB_")
json_env_vars=""

while IFS='=' read -r -d '' key value; do
  skip=false
  # Check if the key starts with any of the prefixes
  for prefix in "${skip_prefixes[@]}"; do
    if [[ $key == "${prefix}"* ]]; then
      skip=true
      break
    fi
  done

  # If the key doesn't start with any of the prefixes, add it to the JSON array
  if [ "$skip" = false ]; then
    json_env_vars+="\"${key}\": \"${value}\", "
  fi
done < <(env -0)

# Remove the trailing comma and add a closing bracket to complete the JSON object
json_env_vars="{${json_env_vars%, }}"



file_content=$(<"$TEMPLATE_PATH")
# Prepare final JSON payload
json_payload=$(cat <<EOF
{
    "new_image_address": "$NEW_IMAGE_ADDRESS",
    "env": "$ENV",
    "stack_name": "$STACK_NAME",
    "template": $(jq -n --arg file_content "$file_content" '$file_content'),
    "environment_variables": $json_env_vars,
    "image_group": "$IMAGE_GROUP"
}
EOF
)

# Maximum number of retry attempts
max_attempts=5

for ((attempt = 1; attempt <= max_attempts; attempt++)); do
  response=$(curl --location --write-out "\nHTTP_STATUS_CODE:%{http_code}\n" --silent "$BASE_URL" \
    --header 'Content-Type: application/json' \
    --header "x-auth-token: $AUTH_TOKEN" \
    --data "$json_payload")

  # Extract the HTTP status code and JSON output from the response
  http_status_code=$(echo "$response" | grep "HTTP_STATUS_CODE" | cut -d ':' -f 2)
  json_output=$(echo "$response" | sed -n '/HTTP_STATUS_CODE/,$!b;/HTTP_STATUS_CODE/d;p')

  echo "$response"
  
  # Check if the HTTP status code is in the 2xx range (indicating success)
  if [[ $http_status_code =~ ^2[0-9][0-9]$ ]]; then
    echo "Webhook successfully sent with HTTP status code $http_status_code."
    exit 0
  else
    echo "Webhook failed with HTTP status code $http_status_code. Retrying..."
    if [ "$attempt" -lt "$max_attempts" ]; then
      sleep 5  # Wait for 5 seconds before retrying
    else
      echo "Max retry attempts reached. Webhook failed."
      exit 1
    fi
  fi
done
