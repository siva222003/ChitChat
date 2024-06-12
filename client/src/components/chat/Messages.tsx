import { useEffect, useRef } from "react";
import useChat from "../../hooks/useChat";
import MessageList from "./MessageList";
import TextMessage from "../ui/messages/TextMessage";

const Messages = () => {
  const { messages } = useChat();
  const messageRef = useRef<HTMLDivElement | null>(null);

  
  useEffect(() => {
    if (messageRef.current !== null) {
      messageRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return (
    <div className="px-3 py-4 bg-messageBg h-full max-h-full overflow-auto">
      <TextMessage />

      <MessageList messages={messages} messageRef={messageRef} />
    </div>
  );
};

export default Messages;
