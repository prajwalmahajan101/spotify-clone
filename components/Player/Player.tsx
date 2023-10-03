"use client";
import React from "react";
import usePlayer from "@/hooks/player/usePlayer";
import useGetSongById from "@/hooks/songs/useGetSongById";
import useLoadSongUrl from "@/hooks/songs/useLoadSongUrl";
import PlayerContent from "@/components/Player/PlayerContent/PlayerContent";

const Player = () => {
  const player = usePlayer();
  const { song } = useGetSongById(player.activeId);

  const songUrl = useLoadSongUrl(song);

  if (!song || !songUrl || !player.activeId) return null;
  return (
    <div
      className={`fixed bottom-0 bg-neutral-900 mx-[0.5rem] w-[calc(100%-1rem)] py-2 h-[80px] px-4 rounded-t-lg`}
    >
      <PlayerContent key={songUrl} song={song} songUrl={songUrl} />
    </div>
  );
};
export default Player;
