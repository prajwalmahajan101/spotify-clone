"use client";

import { FC } from "react";
import { TbPlaylist } from "react-icons/tb";
import { AiOutlinePlus } from "react-icons/ai";
import useAuthModal from "@/hooks/ui/useAuthModal";
import { useUser } from "@/hooks/user/useUser";
import useUploadModal from "@/hooks/ui/useUploadModal";
import { ISong } from "@/types/Song.types";
import MediaItem from "@/components/UI/MediaItem/MediaItem";
import useOnPlay from "@/hooks/player/useOnPlay";
import useSubscriptionModal from "@/hooks/ui/useSubscriptionModal";

interface ILibraryProps {
  songs: ISong[];
}

const Library: FC<ILibraryProps> = ({ songs }) => {
  const authModal = useAuthModal();
  const uploadModal = useUploadModal();
  const subscriptionModal = useSubscriptionModal();
  const { user, subscription } = useUser();
  const onPlay = useOnPlay(songs);

  const onClick = () => {
    if (!user) {
      return authModal.onOpen();
    }

    if (!subscription) {
      return subscriptionModal.onOpen();
    }

    return uploadModal.onOpen();
  };

  return (
    <div className={"flex flex-col"}>
      <div className={"flex items-center justify-between px-5 pt-4"}>
        <div className={"inline-flex items-center gap-x-2"}>
          <TbPlaylist size={26} className={"text-neutral-400"} />
          <p className={"text-neutral-400 font-medium text-md"}>Your Library</p>
        </div>
        <AiOutlinePlus
          className={
            "text-neutral-400 cursor-pointer hover:text-white transition"
          }
          size={20}
          onClick={onClick}
        />
      </div>
      <div className={"flex flex-col gap-y-2 mt-4 px-3"}>
        {songs.map((song) => (
          <MediaItem
            key={song.id}
            onClick={(id: string) => {
              onPlay(id);
            }}
            data={song}
          />
        ))}
      </div>
    </div>
  );
};

export default Library;
