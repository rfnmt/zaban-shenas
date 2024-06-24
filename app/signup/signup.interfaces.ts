export interface IUseGoogleSignup {
  data: { token: string };
  headers: {
    carrier: string;
    fcm_token: string;
    huawei_token: string;
    manufacturer: string;
    model: string;
    operating_system: string;
  };
}

export interface ISignupOTP {
  uid: string;
}
