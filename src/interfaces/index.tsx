export interface LoginRequest {
  identifier: string;
  password: string;
}

export interface RegisterRequest {
  fullname: string;
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  address: string;
  phone_no: string;
  referrer: string;
}
