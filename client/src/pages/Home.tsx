import React, { Suspense, useEffect, useState } from "react";
// import { useSocket } from "../hooks/useSocket";
import useSocket from "../hooks/useSocket";
import Messages from "../components/chat/Messages";
import { useQuery } from "@tanstack/react-query";
import { getUser } from "../providers/AuthProvider";
import { IUser } from "../types/IUser";
import NoChats from "../components/ui/NoChats";

const Home = () => {
  // const socket = useSocket();

  // const {isLoading,data:user} = useQuery({
  //   queryKey: ['user'],
  //   queryFn: getUser
  // })

  // const [message, setMessage] = useState("");
  // const [messages, setMessages] = useState<string[]>([]);

  // const onConnect = () => {
  //   if (socket === null) return;
  //   socket.emit('setup',user)
  // };
  // const onDisConnect = () => {
  //   console.log("Socket DisConnected");
  // };

  // const onSendMessage = () => {
  //   if (socket === null) return;

  //   socket.emit("chat message", message);
  // };
  // const onReceiveMessage = (message: string) => {
  //   setMessages((prev) => [...prev, message]);
  // };

  // useEffect(() => {
  //   if (socket === null || !user) return;
  //   socket.on("connect", onConnect);
  //   socket.on("chat message", onReceiveMessage);
  //   socket.on("disconnect", onDisConnect);

  //   return () => {
  //     socket.off("connect", onConnect);
  //     socket.off("disconnect", onDisConnect);
  //     socket.off("chat message", onReceiveMessage);
  //   };
  // }, [socket,user]);

  return (
   <section className="flex-1">
   
    {/* <NoChats /> */}
    
   </section>
  );
};

export default Home;
