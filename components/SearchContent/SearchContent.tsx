"use client";
import React, { FC } from "react";
import { ISong } from "@/types/Song.types";
import MediaItem from "@/components/UI/MediaItem/MediaItem";
import LikeButton from "@/components/UI/Button/LikeButton";

interface ISearchContentProps {
  songs: ISong[];
}
const SearchContent: FC<ISearchContentProps> = ({ songs }) => {
  if (songs.length === 0) {
    return (
      <div className={"flex flex-col gap-y-2 w-full px-6 text-neutral-400"}>
        No Songs Found.
      </div>
    );
  }
  return (
    <div className={"flex flex-col gap-y-2 w-full px-6 py-2"}>
      {songs.map((song) => (
        <div
          key={song.id}
          className={"flex items-center gap-x-4 w-full rounded-md"}
        >
          <div className={"flex-1"}>
            <MediaItem data={song} />
          </div>
          <LikeButton songId={song.id} />
        </div>
      ))}
    </div>
  );
};
export default SearchContent;
