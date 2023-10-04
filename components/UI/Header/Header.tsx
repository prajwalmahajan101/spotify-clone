"use client";

import React, { FC, ReactNode } from "react";

import { twMerge } from "tailwind-merge";
import { useRouter } from "next/navigation";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import toast from "react-hot-toast";

import Link from "next/link";
import { RxCaretLeft, RxCaretRight } from "react-icons/rx";
import { HiHome } from "react-icons/hi";
import { BiSearch } from "react-icons/bi";
import { AiFillGithub } from "react-icons/ai";
import { FaUserAlt } from "react-icons/fa";

import { useUser } from "@/hooks/user/useUser";
import useAuthModal from "@/hooks/ui/useAuthModal";

import Button from "@/components/UI/Button/Button";

interface IHeaderProps {
  children: ReactNode;
  className?: string;
}

const Header: FC<IHeaderProps> = ({ children, className }) => {
  const router = useRouter();
  const authModal = useAuthModal();

  const supabaseClient = useSupabaseClient();
  const { user } = useUser();

  const handleLogout = async () => {
    const { error } = await supabaseClient.auth.signOut();
    //   TODO: Reset any playing songs
    router.refresh();
    if (error) {
      toast.error(error.message);
    } else {
      toast.success("Logged Out!");
    }
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
            onClick={() => router.push("/")}
          >
            <HiHome className={"text-black"} size={20} />
          </button>
          <button
            className={
              "rounded-full p-2 bg-white flex items-center justify-center hover:opacity-75 transition"
            }
            onClick={() => router.push("/search")}
          >
            <BiSearch className={"text-black"} size={20} />
          </button>
        </div>
        <div className={"flex justify-center items-center gap-y-4"}>
          {user ? (
            <div className="flex gap-x-4 items-center">
              <Link
                href={"https://github.com/prajwalmahajan101/spotify-clone"}
                target="_blank"
                className={"hidden md:flex"}
              >
                <Button
                  className={
                    "flex w-auto gap-x-2 items-center justify-center bg-neutral-900 text-white lg:w-[180px]  lg:py-2"
                  }
                >
                  <AiFillGithub size={20} />
                  <p className={"hidden lg:flex"}>Github Repo</p>
                </Button>
              </Link>
              <Button onClick={handleLogout} className={"bg-white px-6 py-2"}>
                Logout
              </Button>
              <Button
                onClick={() => {
                  router.push("/account");
                }}
                className={"bg-white"}
              >
                <FaUserAlt />
              </Button>
            </div>
          ) : (
            <>
              <div>
                <Button
                  className={"bg-transparent text-neutral-300 font-medium"}
                  onClick={authModal.onOpen}
                >
                  Sign up
                </Button>
              </div>
              <div>
                <Button
                  className={"bg-white px-6 py-2"}
                  onClick={authModal.onOpen}
                >
                  Log In
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
      {children}
    </div>
  );
};

export default Header;
