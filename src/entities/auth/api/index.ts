import http from "@/shared/api";
import {
  SignInRequest,
  SignInResponse,
  SignUpRequest,
  SignUpResponse,
} from "../model/types";
import { SessionService } from "@/shared/utils/SessionService";

export const AuthApi = {
  async googleSignIn(token: string) {
    const resp = await http.get<SignInResponse>(
      "/auth/google/callback?code=" + token
    );
    if (resp.data.access_token) {
      SessionService.setToken(resp.data.access_token);
    }
    return resp;
  },

  async signIn(data: SignInRequest) {
    const resp = await http.post<SignInResponse>("/auth/signin", data);
    if (resp.data.access_token) {
      SessionService.setToken(resp.data.access_token);
    }
    return resp;
  },

  async signUp(data: SignUpRequest) {
    const resp = await http.post<SignUpResponse>("/auth/signup", data);
    if (resp.data.id) {
      await AuthApi.signIn(data);
    }
    return resp;
  },

  async refresh() {
    const resp = await http.post<SignInResponse>("/auth/refresh");
    if (resp.data.access_token) {
      SessionService.setToken(resp.data.access_token);
    }
    return resp;
  },

  async logout() {
    const resp = await http.post<SignInResponse>("/auth/signout");
    SessionService.removeToken();
    return resp;
  },
};
