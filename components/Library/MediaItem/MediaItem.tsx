"use client";
import React, { FC } from "react";
import { ISong } from "@/types/Song.types";
import useLoadImage from "@/hooks/ui/useLoadImage";
import Image from "next/image";

interface IMediaItemProps {
  onClick?: (id: string) => void;
  data: ISong;
}

const MediaItem: FC<IMediaItemProps> = ({ onClick, data }) => {
  const imageUrl = useLoadImage(data);
  const handleClick = () => {
    if (onClick) {
      return onClick(data.id);
    }

    // TODO: Default turn on player

    return;
  };
  return (
    <div
      onClick={handleClick}
      className={`flex items-center gap-x-3 cursor-pointer hover:bg-neutral-800/50 w-full p-2 rounded-md hover:scale-105`}
    >
      <div
        className={`relative rounded-md min-h-[48px] min-w-[48px] overflow-hidden`}
      >
        <Image
          fill
          src={imageUrl || "/image/liked.png"}
          alt={"Image"}
          className={`object-cover`}
        />
      </div>
      <div className={`flex flex-col gap-y-1 overflow-hidden`}>
        <p className={`text-white truncate`}>{data.title}</p>
        <p className={`text-neutral-400 truncate`}>{data.author}</p>
      </div>
    </div>
  );
};
export default MediaItem;
