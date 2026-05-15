import { useMutation, useQueryClient } from "@tanstack/react-query";
import { patchMyInfo } from "../../apis/auth";
import { QUERY_KEY } from "../../constants/key";
import type { RequestUpdateMyInfoDto } from "../../types/auth";

function useUpdateMyInfo() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (dto: RequestUpdateMyInfoDto) => patchMyInfo(dto),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.myInfo] });
    },
  });
}

export default useUpdateMyInfo;
