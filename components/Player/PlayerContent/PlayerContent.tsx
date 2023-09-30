import React, { FC } from "react";
import { ISong } from "@/types/Song.types";

interface IPlayerContentProps {
  song: ISong;
  songUrl: string;
}

const PlayerContent: FC<IPlayerContentProps> = ({ song, songUrl }) => {
  return <div>PlayerContent</div>;
};
export default PlayerContent;
