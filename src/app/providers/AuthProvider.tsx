import { useUserStore } from "@/entities/user";
import React, { useEffect } from "react";
import { Redirect } from "react-router";
import { useSessionStorage } from "usehooks-ts";
interface AuthProviderProps extends React.HTMLAttributes<HTMLDivElement> {}

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [token] = useSessionStorage("TOKEN", "");

  const setUser = useUserStore((state) => state.setUser);
  useEffect(() => {
    setUser();
  }, []);

  if (!token) {
    return <Redirect to={"/login"} />;
  }

  return children;
};

export default AuthProvider;
