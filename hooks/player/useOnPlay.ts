import { ISong } from "@/types/Song.types";
import usePlayer from "@/hooks/player/usePlayer";
import useAuthModal from "@/hooks/ui/useAuthModal";
import { useUser } from "@/hooks/user/useUser";
import toast from "react-hot-toast";

const useOnPlay = (songs: ISong[]) => {
  const player = usePlayer();
  const authModal = useAuthModal();
  const { user, subscription } = useUser();

  const onPlay = (id: string) => {
    if (!user) return authModal.onOpen();

    if (!subscription) {
      toast(`Subscribe to listen more then 30 sec`);
      setTimeout(() => {
        player.reset();
      }, 1000 * 30);
    }

    player.setId(id);
    player.setIds(songs.map((song) => song.id));
  };

  return onPlay;
};

export default useOnPlay;
