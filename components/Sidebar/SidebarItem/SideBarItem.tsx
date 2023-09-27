import { FC, ReactNode } from "react";
import { IconType } from "react-icons";
import Link from "next/link";
import { twMerge } from "tailwind-merge";

interface ISidebarItemProps {
  label: string;
  icon: IconType;
  active?: boolean;
  href: string;
}

const SideBarItem: FC<ISidebarItemProps> = ({
  label,
  icon: Icon,
  active,
  href,
}) => {
  return (
    <Link
      href={href}
      className={twMerge(
        `flex flex-row h-auto items-center w-full gap-x-4 text-md font-medium cursor-pointer 
        hover:text-white transition text-neutral-400 py-1`,
        active && "text-white",
      )}
    >
      <Icon size={26}></Icon>
      <p className={"truncate w-full"}>{label}</p>
    </Link>
  );
};
export default SideBarItem;
