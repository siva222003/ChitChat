import { createContext } from "react";
import { MemberType, MessageType } from "../types/chat.types";
import { FriendsType } from "../types/user.types";

type ChatContextType = {
  messages: MessageType[];
  message: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSendMessage: () => void;
  handleKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  setMessage: React.Dispatch<React.SetStateAction<string>>;
  currentChat: FriendsType | null;
  setCurrentChat: React.Dispatch<React.SetStateAction<MemberType | undefined>>;
};

const ChatContextValue = {
  messages: [],
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
