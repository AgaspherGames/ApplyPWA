import http from "@/shared/api";
import { IUser, IUpdateUser } from "../model/types";

export const UserApi = {
  getMe() {
    return http.get<IUser>("/user/me");
  },

  getById(id: string) {
    return http.get<IUser>(`/user/${id}`);
  },

  updateUser(data: IUpdateUser) {
    return http.put<IUser>("/user", data);
  },

  uploadAvatar(image: Blob) {
    const formData = new FormData();
    formData.append("file", image);
    return http.post("/user/avatar", formData);
  },
};
