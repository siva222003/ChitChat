import { ReactNode, useState } from "react";
import ChatContext from "../context/ChatContext";
import { Message } from "../types/chat.types";
import { FriendsType } from "../types/user.types";
type ChatProiderProps = {
  children: ReactNode;
};

const ChatProider = ({ children }: ChatProiderProps) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [message, setMessage] = useState<string>("");
  const [currentChat, setCurrentChat] = useState<FriendsType | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  };

  const handleSendMessage = () => {
    if (!message.trim()) return;
    setMessages((prev) => [...prev, message]);
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
        messages,
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
