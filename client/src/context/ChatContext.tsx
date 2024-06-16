import { createContext } from "react";
import { CurrentChatType, MemberType, MessageType } from "../types/chat.types";
import { set } from "zod";

type ChatContextType = {
  message: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSendMessage: () => void;
  handleKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  setMessage: React.Dispatch<React.SetStateAction<string>>;
  currentChat: CurrentChatType | null;
  setCurrentChat: React.Dispatch<React.SetStateAction<CurrentChatType | null>>;
  
};

const ChatContextValue = {
  message: "",
  handleChange: () => {},
  handleSendMessage: () => {},
  handleKeyDown: () => {},
  setMessage: () => {},
  currentChat: null,
  setCurrentChat: () => {},
};

const ChatContext = createContext<ChatContextType>(ChatContextValue);

export default ChatContext;
