"use client";
import { FC, ReactNode } from "react";
import { MyUserContextProvider } from "@/hooks/user/useUser";
interface IUserProviderProps {
  children: ReactNode;
}

const UserProvider: FC<IUserProviderProps> = ({ children }) => {
  return <MyUserContextProvider>{children}</MyUserContextProvider>;
};

export default UserProvider;
