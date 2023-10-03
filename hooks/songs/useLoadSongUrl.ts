import { ISong } from "@/types/Song.types";
import { useSupabaseClient } from "@supabase/auth-helpers-react";

const useLoadSongUrl = (song?: ISong) => {
  const supbaseClient = useSupabaseClient();
  if (!song) {
    return "";
  }

  const { data: songData } = supbaseClient.storage
    .from("songs")
    .getPublicUrl(song.song_path);

  return songData.publicUrl;
};

export default useLoadSongUrl;
