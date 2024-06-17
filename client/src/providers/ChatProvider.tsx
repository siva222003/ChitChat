import { ReactNode, useState } from "react";
import ChatContext from "../context/ChatContext";
import { CurrentChatType, MessageType } from "../types/chat.types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../api/axios";
type ChatProiderProps = {
  children: ReactNode;
};

const ChatProider = ({ children }: ChatProiderProps) => {
  const client = useQueryClient();

  const [message, setMessage] = useState<string>("");
  const [currentChat, setCurrentChat] = useState<CurrentChatType | null>(null);

  const { mutate } = useMutation<MessageType, Error, string>({
    mutationFn: async (message: string) => {
      if (!currentChat) return;
      const response = await api.post(`/chat/${currentChat.chatId}`, {
        message,
      });
      return response.data.data;
    },
    onSuccess: (data) => {
      client.setQueryData(["chat"], (prev: MessageType[]) => [...prev, data]);
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  };

  const handleSendMessage = () => {
    if (!message.trim()) return;
    // socket.emit(SocketEvents.CHAT_MESSAGE, {message ,id : currentChat?._id});
    mutate(message);
    setMessage("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  return (
    <ChatContext.Provider
      value={{
        message,
        setMessage,
        handleChange,
        handleSendMessage,
        handleKeyDown,
        currentChat,
        setCurrentChat,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export default ChatProider;
