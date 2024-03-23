import { createContext } from "react";
import socketio from "socket.io-client";

type SocketContextType = {
  socket: ReturnType<typeof socketio> | null;
  isOnline: boolean;
};

const SocketContextValue = {
  socket: null,
  isOnline: false,
};

const SocketContext = createContext<SocketContextType>(SocketContextValue);

export default SocketContext;
