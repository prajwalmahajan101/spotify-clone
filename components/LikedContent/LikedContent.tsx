"use client";
import React, { FC, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@/hooks/user/useUser";
import { ISong } from "@/types/Song.types";
import MediaItem from "@/components/UI/MediaItem/MediaItem";
import LikeButton from "@/components/UI/Button/LikeButton";
import useOnPlay from "@/hooks/player/useOnPlay";

interface ILikedContentProps {
  songs: ISong[];
}

const LikedContent: FC<ILikedContentProps> = ({ songs }) => {
  const router = useRouter();

  const { isLoading, user } = useUser();
  useEffect(() => {
    if (!isLoading && !user) {
      router.replace("/");
    }
  }, [isLoading, user, router]);

  const onPlay = useOnPlay(songs);

  if (songs.length === 0) {
    return (
      <div className={"flex flex-col gap-y-2 w-full px-6 text-neutral-400"}>
        No Liked Songs.
      </div>
    );
  }

  return (
    <div className={`flex flex-col gap-y-2 w-full p-6`}>
      {songs.map((song) => (
        <div key={song.id} className={`flex items-center gap-x-4 w-full`}>
          <div className={`flex-1`}>
            <MediaItem
              data={song}
              onClick={(id: string) => {
                onPlay(id);
              }}
            />
          </div>
          <LikeButton songId={song.id} />
        </div>
      ))}
    </div>
  );
};
export default LikedContent;
