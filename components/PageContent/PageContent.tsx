"use client";

import React, { FC } from "react";
import { ISong } from "@/types/Song.types";
import SongItem from "@/components/PageContent/SongItem/SongItem";
import useOnPlay from "@/hooks/player/useOnPlay";

interface IPageContentProps {
  songs: ISong[];
}
const PageContent: FC<IPageContentProps> = ({ songs }) => {
  const onPlay = useOnPlay(songs);

  if (songs.length === 0) {
    return <div className={"mt-4 text-neutral-400"}>No Songs Available.</div>;
  }
  return (
    <div
      className={`grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-8 gap-4 mt-4`}
    >
      {songs.map((item) => (
        <SongItem
          key={item.id}
          onClick={(id: string) => {
            onPlay(id);
          }}
          data={item}
        />
      ))}
    </div>
  );
};
export default PageContent;
