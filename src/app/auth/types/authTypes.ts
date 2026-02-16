export interface SignInPayload {
  email: string;
  password: string;
}

export interface SignUpPayload {
  email: string;
  password: string;
  name?: string;
  phone?: string;
  role?: string;
}

export interface AuthResponse {
  token?: string;
  data?: any;
  [key: string]: any;
}
