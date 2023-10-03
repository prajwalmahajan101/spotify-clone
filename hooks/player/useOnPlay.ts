import { ISong } from "@/types/Song.types";
import usePlayer from "@/hooks/player/usePlayer";
import useAuthModal from "@/hooks/ui/useAuthModal";
import { useUser } from "@/hooks/user/useUser";

const useOnPlay = (songs: ISong[]) => {
  const player = usePlayer();
  const authModal = useAuthModal();
  const { user } = useUser();

  const onPlay = (id: string) => {
    if (!user) return authModal.onOpen();

    player.setId(id);
    player.setIds(songs.map((song) => song.id));
  };

  return onPlay;
};

export default useOnPlay;
