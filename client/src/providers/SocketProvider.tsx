import { ReactNode, useState } from "react";
import SocketContext from "../context/SocketContext";

const SocketProvider = ({ children }: { children: ReactNode }) => {
  const [onlineUsers, setOnlineUsers] = useState<string[]>([]);
  
  return (
    <SocketContext.Provider value={{ onlineUsers, setOnlineUsers }}>
      {children}
    </SocketContext.Provider>
  );
};

export default SocketProvider;
  