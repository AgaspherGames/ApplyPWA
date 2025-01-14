export interface SignInRequest {
  email: string;
  password: string;
}

export interface SignInResponse {
  access_token: string;
}

export interface SignUpRequest {
  email: string;
  password: string;
  first_name: string;
  last_name: string;
}

export interface SignUpResponse {
  id: string;
}
