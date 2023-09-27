"use client";
import React, { FC, ReactNode, useMemo } from "react";
import { usePathname } from "next/navigation";
import { HiHome } from "react-icons/hi";
import { BiSearch } from "react-icons/bi";
import Box from "@/components/UI/Box/Box";
import SideBarItem from "@/components/Sidebar/SidebarItem/SideBarItem";
import Library from "@/components/Library/Library";

export interface ISidebarProps {
  children: ReactNode;
}

const SideBar: FC<ISidebarProps> = ({ children }) => {
  const pathname = usePathname();
  const routes = useMemo(
    () => [
      {
        label: "Home",
        active: pathname !== "/search",
        href: "/",
        icon: HiHome,
      },
      {
        label: "Search",
        active: pathname === "/search",
        href: "/search",
        icon: BiSearch,
      },
    ],
    [],
  );
  return (
    <div className="flex h-full">
      <div className="hidden md:flex flex-col gap-y-2 bg-black h-full w-[300px] p-2">
        <Box>
          <div className={"flex flex-col gay-y-4 px-5 py-4"}>
            {routes.map((item) => (
              <SideBarItem key={item.label} {...item} />
            ))}
          </div>
        </Box>
        <Box className={"overflow-y-auto h-full"}>
          <Library />
        </Box>
      </div>
      <main className={"h-full flex-1 overflow-y-auto py-2"}>{children}</main>
    </div>
  );
};

export default SideBar;