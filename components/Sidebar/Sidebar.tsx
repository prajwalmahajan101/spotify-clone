"use client";
import React, { FC, ReactNode, useMemo } from "react";
import { usePathname } from "next/navigation";
import { HiHome } from "react-icons/hi";
import { BiSearch } from "react-icons/bi";
import Box from "@/components/UI/Box/Box";
import SideBarItem from "@/components/Sidebar/SidebarItem/SideBarItem";
import Library from "@/components/Library/Library";
import { ISong } from "@/types/Song.types";
import usePlayer from "@/hooks/player/usePlayer";
import { twMerge } from "tailwind-merge";

export interface ISidebarProps {
  children: ReactNode;
  songs: ISong[];
}

const SideBar: FC<ISidebarProps> = ({ children, songs }) => {
  const pathname = usePathname();
  const player = usePlayer();
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
    [pathname],
  );
  return (
    <div
      className={twMerge(
        `flex h-full mx-2 md:mx-0 md:mr-2`,
        player.activeId && "h-[calc(100%-80px)]",
      )}
    >
      <div className="hidden md:flex flex-col gap-y-2 bg-black h-full w-[300px] p-2">
        <Box>
          <div className={"flex flex-col gay-y-4 px-5 py-4"}>
            {routes.map((item) => (
              <SideBarItem key={item.label} {...item} />
            ))}
          </div>
        </Box>
        <Box className={"overflow-y-auto h-full"}>
          <Library songs={songs} />
        </Box>
      </div>
      <main className={"h-full flex-1 overflow-y-auto py-2"}>{children}</main>
    </div>
  );
};

export default SideBar;
