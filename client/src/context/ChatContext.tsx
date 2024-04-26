import { createContext } from "react";
import { Message } from "../types/chat.types";
import { FriendsType } from "../types/user.types";

type ChatContextType = {
  messages: Message[];
  message: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSendMessage: () => void;
  handleKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  setMessage: React.Dispatch<React.SetStateAction<string>>;
  currentChat: FriendsType | null;
  setCurrentChat: React.Dispatch<React.SetStateAction<FriendsType | null>>;
 
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
