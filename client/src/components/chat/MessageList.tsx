import useAuth from "../../hooks/useAuth";
import { MessageType } from "../../types/chat.types";
import TextMessage from "../ui/messages/TextMessage";

interface MessageListProps {
  messages: MessageType[];
  messageRef: React.RefObject<HTMLDivElement>;
}

const MessageList = ({ messages, messageRef }: MessageListProps) => {
  const { user } = useAuth();

  return (
    <div ref={messageRef}>
      {messages.map((message, index) => {
        if (message.message) {
          return (
            <TextMessage
              key={index}
              message={message.message}
              isOwnMsg={message.sender === user?._id}
            />
          );
        }
        return null;
      })}
    </div>
  );
};

export default MessageList;
