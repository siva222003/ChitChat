import { useEffect, useRef } from "react";
import useChat from "../../hooks/useChat";
import MessageList from "./MessageList";
import TextMessage from "../ui/messages/TextMessage";
import { useQuery } from "@tanstack/react-query";
import { api } from "../../api/axios";
import { MessageType } from "../../types/chat.types";

const Messages = () => {

  const messageRef = useRef<HTMLDivElement | null>(null);

  const { currentChat } = useChat();

  const { data: messages, refetch } = useQuery<MessageType[]>({
    queryKey: ["chat"],
    queryFn: async () => {
      const response = await api.get(`/chat/${currentChat?.chatId}`);
      return response.data.data.messages;
    },
    // refetchOnMount: true,
  });

  useEffect(() => {
    if (currentChat) {
      refetch();
    }
  }, [currentChat]);

  useEffect(() => {
    if (messageRef.current !== null) {
      messageRef.current.scrollIntoView({ behavior: "smooth" });
    }
    console.log('hello')
  }, [messages]);

  return (
    <div className="px-3 py-4 bg-messageBg h-full max-h-full overflow-auto">
      {messages && messages.length > 0 ? (
        <MessageList messages={messages} messageRef={messageRef} />
      ) : (
        <div className="flex flex-col items-center justify-center h-full">
          <TextMessage message="Start the Conversation" isOwnMsg={true} />
        </div>
      )}
    </div>
  );
};

export default Messages;
