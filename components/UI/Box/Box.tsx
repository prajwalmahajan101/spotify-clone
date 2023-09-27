import React, { FC, ReactNode } from "react";
import { twMerge } from "tailwind-merge";
interface IBoxProps {
  children: ReactNode;
  className?: string;
}
const Box: FC<IBoxProps> = ({ children, className }) => {
  return (
    <div
      className={twMerge(`bg-neutral-900 rounded-lg h-fit w-full`, className)}
    >
      {children}
    </div>
  );
};

export default Box;
