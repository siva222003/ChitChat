interface MessageListProps {
  messages: string[];
  messageRef: React.RefObject<HTMLDivElement>;
}

const MessageList = ({ messages, messageRef }: MessageListProps) => {
  return (
    <>
      {messages.map((message, index) => {
        if (typeof message === "string") {
          return (
            <div
              key={index}
              ref={messageRef}
              className="bg-messageRight px-3 py-4 my-2 text-white w-fit rounded-2xl ml-auto"
            >
              <p className="text-xs">{message}</p>
            </div>
          );
        }
        return null;
      })}
    </>
  );
};

export default MessageList;
