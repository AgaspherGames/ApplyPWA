import { create } from "zustand";
import { IUpdateUser, IUser } from "./types";
import { UserApi } from "../api/UserApi";

interface UserState {
  user?: IUser;
  setUser: () => void;
  updateUser: (updatedUser: IUpdateUser) => void;
}

export const useUserStore = create<UserState>()((set) => ({
  user: undefined,
  
  setUser: async () => {
    const user = (await UserApi.getMe()).data;
    set(() => {
      return { user };
    });
  },

  updateUser: async (updatedUser: IUpdateUser) => {
    set((data) => {
      return { user: { ...(data.user as IUser), ...updatedUser } };
    });
    await UserApi.updateUser(updatedUser);
  },
}));
