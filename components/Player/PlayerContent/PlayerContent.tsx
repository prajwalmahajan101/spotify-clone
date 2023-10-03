import React, { FC, useEffect, useState } from "react";
import { ISong } from "@/types/Song.types";
import MediaItem from "@/components/UI/MediaItem/MediaItem";
import LikeButton from "@/components/UI/Button/LikeButton";
import { BsPauseFill, BsPlayFill } from "react-icons/bs";
import { AiFillStepBackward, AiFillStepForward } from "react-icons/ai";
import { HiSpeakerWave, HiSpeakerXMark } from "react-icons/hi2";
import Slider from "@/components/Player/PlayerContent/Slider/Slider";
import usePlayer from "@/hooks/player/usePlayer";
import useSound from "use-sound";

interface IPlayerContentProps {
  song: ISong;
  songUrl: string;
}

const PlayerContent: FC<IPlayerContentProps> = ({ song, songUrl }) => {
  const player = usePlayer();

  const [volume, setVolume] = useState<number>(1);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  const Icon = isPlaying ? BsPauseFill : BsPlayFill;
  const VolumeIcon = volume === 0 ? HiSpeakerXMark : HiSpeakerWave;

  const onPlayNext = () => {
    if (player.ids.length === 0) {
      return;
    }
    const currentSongIndex = player.ids.findIndex(
      (id) => id === player.activeId,
    );
    const nextSongId = player.ids[currentSongIndex + 1];
    if (!nextSongId) {
      return player.setId(player.ids[0]);
    }
    return player.setId(nextSongId);
  };

  const onPlayPrevious = () => {
    if (player.ids.length === 0) {
      return;
    }
    const currentSongIndex = player.ids.findIndex(
      (id) => id === player.activeId,
    );
    const previousSongId = player.ids[currentSongIndex - 1];
    if (!previousSongId) {
      return player.setId(player.ids[player.ids.length - 1]);
    }
    return player.setId(previousSongId);
  };

  const [play, { pause, sound }] = useSound(songUrl, {
    volume: volume,
    onplay: () => {
      setIsPlaying(true);
    },
    onend: () => {
      setIsPlaying(false);
      onPlayNext();
    },
    onpause: () => {
      setIsPlaying(false);
    },
    format: ["mp3"],
  });

  useEffect(() => {
    sound?.play();

    return () => {
      sound?.unload();
    };
  }, [sound]);

  const handlePlay = () => {
    if (!isPlaying) {
      play();
    } else {
      pause();
    }
    setIsPlaying((prevState) => !prevState);
  };

  const toggleMute = () => {
    if (volume === 0) setVolume(1);
    else setVolume(0);
  };

  return (
    <div className={`grid grid-cols-2 md:grid-cols-3 h-full`}>
      <div className={"flex w-full justify-start"}>
        <div className={`flex items-center gap-x-4`}>
          <MediaItem data={song} />
          <LikeButton songId={song.id} />
        </div>
      </div>
      <div
        className={`flex md:hidden col-auto w-full justify-end items-center`}
      >
        <div
          onClick={handlePlay}
          className={`h-10 w-10 flex items-center justify-center rounded-full bg-white p-1 cursor-pointer`}
        >
          <Icon
            size={30}
            className={`text-black  ${!isPlaying ? "translate-x-[1.5px]" : ""}`}
          />
        </div>
      </div>

      <div
        className={`hidden h-full md:flex justify-center items-center w-full max-w-[722px] gap-x-6`}
      >
        <AiFillStepBackward
          onClick={onPlayPrevious}
          size={30}
          className={`text-neutral-400 hover:text-white cursor-pointer transition`}
        />
        <div
          className={`h-10 w-10 flex items-center justify-center rounded-full bg-white p-1 cursor-pointer`}
        >
          <Icon
            onClick={handlePlay}
            size={30}
            className={`text-black ${!isPlaying ? "translate-x-[1.5px]" : ""}`}
          />
        </div>

        <AiFillStepForward
          onClick={onPlayNext}
          size={30}
          className={`text-neutral-400 hover:text-white cursor-pointer transition`}
        />
      </div>
      <div className={`hidden md:flex w-full justify-end pr-2`}>
        <div className={"flex items-center gap-x-2 w-[120px]"}>
          <VolumeIcon
            onClick={toggleMute}
            size={34}
            className={`cursor-pointer`}
          />
          <Slider
            value={volume}
            onChange={(value: number) => {
              setVolume(value);
            }}
          />
        </div>
      </div>
    </div>
  );
};
export default PlayerContent;
