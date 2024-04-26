import { useEffect, useRef } from "react";
import useChat from "../../hooks/useChat";
import NoChats from "../ui/NoChats";



const Messages = () => {
  const { messages } = useChat();
  const messageRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (messageRef.current !== null) {
      messageRef.current.scrollIntoView({ behavior: "smooth" });
    }
  },[messages]);

  return (
    <div className="px-3 py-4 bg-messageBg h-full max-h-full overflow-auto">
      <div className="bg-messageRight px-3 py-4 my-2 text-white w-fit rounded-2xl ml-auto">
        <p className="text-xs">This is a test message</p>
      </div>
      <div className="bg-white px-3 py-4 my-2 text-messageLeft w-fit rounded-2xl ">
        <p className="text-xs">This is a test message</p>
      </div>
      <div className="bg-messageRight px-3 py-4 my-2 text-white w-fit rounded-2xl ml-auto">
        <p className="text-xs">Here I want to write something else</p>
      </div>
      <div className="bg-messageRight px-3 py-4 my-2 text-white w-fit rounded-2xl ml-auto">
        <p className="text-xs">This is a test message</p>
      </div>

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
    </div>
  );
};

export default Messages;
