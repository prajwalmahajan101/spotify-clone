"use client";
import React, { FC } from "react";
import { ISong } from "@/types/Song.types";
import MediaItem from "@/components/Library/MediaItem/MediaItem";

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
        <div key={song.id} className={"flex items-center gap-x-4 w-full"}>
          <div className={"flex-1 hover:px-6"}>
            <MediaItem data={song} />
          </div>
        </div>
      ))}
    </div>
  );
};
export default SearchContent;
