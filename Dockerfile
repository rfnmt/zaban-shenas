# syntax=docker/dockerfile:experimental
FROM node:18

ARG API_URL
ARG APP_URL


ENV NEXT_PUBLIC_API_URL=$API_URL
ENV NEXT_PUBLIC_APP_URL=$APP_URL

RUN apt update \
    && apt install -y htop \
    vim \
    && apt clean \
    && apt autoclean 
WORKDIR /app
ADD . /app
RUN yarn install
RUN yarn build
RUN chmod +x ./deployment.sh
ENTRYPOINT [ "yarn", "start" ]
