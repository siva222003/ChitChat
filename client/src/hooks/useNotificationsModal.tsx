import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { api } from "../api/axios";

const useNotificationsModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: async (data: { friendId: string; accept: boolean }) => {
      const response = await api.post("/user/accept-friend", data);
      return response.data;
    },
    // onSuccess: (data) => {
    //   localStorage.setItem("accessToken", data.data.accessToken || "");
    //   queryClient.invalidateQueries({ queryKey: ["contact"] });
    //   navigate(HOME_ROUTE);
    // },
    // onError: (err: AxiosError) => {
    //   console.error(
    //     "Error from server:",
    //     (err.response?.data as Error).message
    //   );
    // },
  });

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleFriendRequest = (data: { friendId: string; accept: boolean }) => {
    mutate(data);
    console.log("Friend request handled");
  };

  return {
    isModalOpen,
    showModal,
    handleOk,
    handleCancel,
    handleFriendRequest,
  };
};

export default useNotificationsModal;
