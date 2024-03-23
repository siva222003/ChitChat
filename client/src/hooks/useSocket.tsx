// import { useContext } from "react";
// import SocketContext from "../context/SocketContext";

// const useSocket = () => useContext(SocketContext);

// export { useSocket };

//UseSocket.js
import { useEffect, useState } from "react";
import socketio from "socket.io-client";

const useSocket = () => {
  const [socket, setSocket] = useState<ReturnType<typeof socketio> | null>(null);

  useEffect(() => {
    const newSocket = socketio("http://localhost:3000");
    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, []);

  return socket;
};

export default useSocket;
