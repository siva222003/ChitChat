import { createContext } from "react";

type SocketContextType = {
  onlineUsers: string[];
  setOnlineUsers: React.Dispatch<React.SetStateAction<string[]>>
};

const SocketContextValue = {
  onlineUsers: [],
  setOnlineUsers: () => {}
};

const SocketContext = createContext<SocketContextType>(SocketContextValue);

export default SocketContext;
