"use client";
import React, { FC, ReactNode } from "react";
import { twMerge } from "tailwind-merge";
import { useRouter } from "next/navigation";
import { RxCaretLeft, RxCaretRight } from "react-icons/rx";
import { HiHome } from "react-icons/hi";
import { BiSearch } from "react-icons/bi";
import Button from "@/components/UI/Button/Button";
interface IHeaderProps {
  children: ReactNode;
  className?: string;
}

const Header: FC<IHeaderProps> = ({ children, className }) => {
  const router = useRouter();
  const handleLogout = () => {
    //   Handle logout in the future
  };

  return (
    <div
      className={twMerge(
        "h-fit bg-gradient-to-b from-emerald-800 p-6",
        className,
      )}
    >
      <div className={"w-full mb-4 flex items-center justify-between"}>
        <div className={"hidden md:flex gap-x-2 items-center"}>
          <button
            className={
              "rounded-full bg-black flex items-center justify-center hover:opacity-75 transition"
            }
            onClick={() => router.back()}
          >
            <RxCaretLeft className={"text-white"} size={35} />
          </button>
          <button
            className={
              "rounded-full bg-black flex items-center justify-center hover:opacity-75 transition"
            }
            onClick={() => router.forward()}
          >
            <RxCaretRight className={"text-white"} size={35} />
          </button>
        </div>
        <div className={"flex md:hidden gap-x-2 items-center"}>
          <button
            className={
              "rounded-full p-2 bg-white flex items-center justify-center hover:opacity-75 transition"
            }
          >
            <HiHome className={"text-black"} size={20} />
          </button>
          <button
            className={
              "rounded-full p-2 bg-white flex items-center justify-center hover:opacity-75 transition"
            }
          >
            <BiSearch className={"text-black"} size={20} />
          </button>
        </div>
        <div className={"flex justify-center items-center gap-y-4"}>
          <>
            <div>
              <Button
                className={"bg-transparent text-neutral-300 font-medium"}
                onClick={() => {}}
              >
                Sign up
              </Button>
            </div>
            <div>
              <Button className={"bg-white px-6 py-2"} onClick={() => {}}>
                Log In
              </Button>
            </div>
          </>
        </div>
      </div>
      {children}
    </div>
  );
};

export default Header;
