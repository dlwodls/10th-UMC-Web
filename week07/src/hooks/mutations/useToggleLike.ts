import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postLike, deleteLike } from "../../apis/lp";
import { QUERY_KEY } from "../../constants/key";

function useToggleLike(lpId: number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (isLiked: boolean) =>
      isLiked ? deleteLike(lpId) : postLike(lpId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.lp, lpId],
      });
    },
  });
}

export default useToggleLike;
