import { useMutation } from "@tanstack/react-query";

import { signinByGoogle } from "../api";
import { IUseGoogleSignup } from "../signup.interfaces";

export const useGoogleSignup = () => {
  return useMutation({
    mutationFn: ({ data, headers }: IUseGoogleSignup) => {
      return signinByGoogle({ data, headers });
    },
  });
};
