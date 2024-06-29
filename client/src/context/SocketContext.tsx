import { createContext } from "react";

type SocketContextType = {
  onlineUsers: string[];
  setOnlineUsers: React.Dispatch<React.SetStateAction<string[]>>
  typingUsers: string[];
  setTypingUsers: React.Dispatch<React.SetStateAction<string[]>>

};

const SocketContextValue = {
  onlineUsers: [],
  setOnlineUsers: () => {},
  typingUsers: [],
  setTypingUsers: () => {}
};

const SocketContext = createContext<SocketContextType>(SocketContextValue);

export default SocketContext;
