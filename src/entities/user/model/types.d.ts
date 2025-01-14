export interface IUser {
  id: string;
  first_name: string;
  last_name: string;
  middle_name?: string;
  email: string;
  avatar: string;
  is_verified: boolean;
  created_at: string;
}

export type IUpdateUser = Pick<IUser, "first_name" | "last_name" | "middle_name">;