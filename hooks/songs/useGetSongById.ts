import { useEffect, useMemo, useState } from "react";
import { useSessionContext } from "@supabase/auth-helpers-react";

import { ISong } from "@/types/Song.types";
import toast from "react-hot-toast";

const useGetSongById = (songId?: string) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [song, setSong] = useState<ISong | undefined>(undefined);
  const { supabaseClient } = useSessionContext();

  useEffect(() => {
    if (!songId) return;
    setIsLoading(true);
    const fetchSong = async () => {
      const { data, error } = await supabaseClient
        .from("songs")
        .select("*")
        .eq("id", songId)
        .single();

      if (error) {
        setIsLoading(false);
        return toast.error(error.message);
      }
      setIsLoading(false);
      setSong(data as ISong);
    };
    fetchSong();
  }, [songId, supabaseClient]);

  return useMemo(() => ({ isLoading, song }), [isLoading, song]);
};

export default useGetSongById;
