import { ReactNode, useEffect, useState } from "react";

import socketio from "socket.io-client";
import SocketContext from "../context/SocketContext";

const SocketProvider = ({ children }: { children: ReactNode }) => {
  const [socket, setSocket] = useState<ReturnType<typeof socketio> | null>(
    null
  );
  const [isOnline, setOnline] = useState(false);

  useEffect(() => {
    const socket = socketio("http://localhost:3000");
    setSocket(socket);

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <SocketContext.Provider value={{ socket, isOnline }}>
      {children}
    </SocketContext.Provider>
  );
};

export default SocketProvider;
