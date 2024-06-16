import React, { useEffect } from "react";
import ChatHeader from "../../components/chat/ChatHeader";
import Messages from "../../components/chat/Messages";
import SendMessage from "../../components/chat/ChatInput";
import useChat from "../../hooks/useChat";
import NoChats from "../../components/ui/chat/NoChats";
import { useSocket } from "../../hooks/useSocket";
import useAuth from "../../hooks/useAuth";
import socket from "../../utils/socket";
import { SocketEvents } from "../../utils/constants";
import { useQueryClient } from "@tanstack/react-query";
import { MessageType } from "../../types/chat.types";

type ChatProps = {};

const Chat = React.memo((props: ChatProps) => {
  const client = useQueryClient();

  const { currentChat } = useChat();
  const { user } = useAuth();
  const { setOnlineUsers } = useSocket();

  useEffect(() => {
    socket.connect();

    const handleConnect = () => {
      console.log("Connected to server");
      socket.emit(SocketEvents.ONLINE, user);
    };

    const handleDisconnect = () => {
      console.log("Disconnected from server");
    };

    const handleOnlineUsers = (users: string[]) => {
      console.log("Online Users", users);
      setOnlineUsers(users);
    };

    const handleFriendRequest = ({
      notifications,
    }: {
      notifications: string[];
    }) => {
      client.setQueryData(["user"], (data: any) => {
        return { ...data, notifications };
      });
      client.invalidateQueries({ queryKey: ["notifications"] });
    };

    const handleAcceptRequest = () => {
      client.invalidateQueries({ queryKey: ["conversations"] });
    };

    const handleChatMessage = (message: MessageType) => {
     
      if(message.sender !== user?._id){
        client.setQueryData(["chat"], (prev: MessageType[]) => [...prev, message]);
      }
   
    };

    socket.on(SocketEvents.CONNECT, handleConnect);
    socket.on(SocketEvents.DISCONNECT, handleDisconnect);
    socket.on(SocketEvents.ONLINE, handleOnlineUsers);
    socket.on(SocketEvents.FRIEND_REQUEST, handleFriendRequest);
    socket.on(SocketEvents.ACCEPT_REQUEST, handleAcceptRequest);
    socket.on(SocketEvents.CHAT_MESSAGE, handleChatMessage);
    return () => {
      socket.off(SocketEvents.CONNECT, handleConnect);
      socket.off(SocketEvents.DISCONNECT, handleDisconnect);
      socket.off(SocketEvents.ONLINE, handleOnlineUsers);
      socket.off(SocketEvents.FRIEND_REQUEST, handleFriendRequest);
      socket.off(SocketEvents.ACCEPT_REQUEST, handleAcceptRequest);
      socket.off(SocketEvents.CHAT_MESSAGE, handleChatMessage);
      socket.disconnect();
    };
  }, []);

  if (currentChat === null) return <NoChats />;

  return (
    <section className="flex flex-col flex-1 max-h-screen">
      <ChatHeader currentChat={currentChat} />
      <Messages />
      <SendMessage />
    </section>
  );
});

export default Chat;
