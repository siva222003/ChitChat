import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { api } from "../api/axios";
import { NotificationsType } from "../types/user.types";
import { AxiosError } from "axios";

const useNotificationsModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const client = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: async (data: { friendId: string; accept: boolean }) => {
      const response = await api.post("/user/accept-friend", data);
      return response.data;
    },
    onMutate: (data) => {
      client.cancelQueries({ queryKey: ["notifications"] });
      const previousNotifications = client.getQueryData<NotificationsType[]>([
        "notifications",
      ]);

      client.setQueryData<NotificationsType[]>(
        ["notifications"],
        previousNotifications?.filter(
          (notification) => notification._id !== data.friendId
        )
      );

      return { previousNotifications };
    },
    onError: (err: AxiosError, _, context) => {
      console.error(
        "Error from server:",
        (err.response?.data as Error).message
      );

      if (context === undefined) return;

      client.setQueryData<NotificationsType[]>(
        ["notifications"],
        context.previousNotifications
      );
    },

    onSuccess: (data) => {
      const notifications = data.data.notifications;
      if (!notifications) return;
      client.setQueryData(["user"], (data: any) => {
        return { ...data, notifications };
      });
    },

    onSettled: () => {
      client.invalidateQueries({ queryKey: ["notifications"] });
    },
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
