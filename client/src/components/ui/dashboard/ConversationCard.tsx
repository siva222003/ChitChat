import { useMemo } from "react";
import useAuth from "../../../hooks/useAuth";
import useChat from "../../../hooks/useChat";
import { useSocket } from "../../../hooks/useSocket";
import { ConversationType } from "../../../types/chat.types";
import { useMutation } from "@tanstack/react-query";

interface ConversationCardProps {
  conversation: ConversationType;
}

const ConversationCard = ({ conversation }: ConversationCardProps) => {
  const { onlineUsers } = useSocket();
  const { setCurrentChat } = useChat();
  const { user } = useAuth();

  const friend = useMemo(() => {
    return conversation.members.find((member) => member._id !== user?._id);
  }, [conversation.members, user]);

  return (
    <div
      onClick={() => setCurrentChat(friend)}
      className="w-full flex my-3 bg-white rounded-lg py-3 px-4 gap-3 cursor-pointer hover:bg-slate-100"
    >
      <div className="h-10 w-10 rounded-full relative">
        <img
          className="inline-block h-10 w-10 rounded-full"
          src={friend?.avatar}
          alt=""
        />
        {onlineUsers.includes(friend?._id as string) && (
          <span className="absolute bottom-0 right-1 bg-[#76D45E] w-2 h-2 rounded-full"></span>
        )}
      </div>

      <div>
        <h4 className="text-[13px] font-semibold text-[#030303]">
          {friend?.firstName}
        </h4>
        {conversation.lastMessage && (
          <p className="text-xs text-[#7C7C7D]">{conversation.lastMessage}</p>
        )}
      </div>

      <div className="flex flex-col justify-center ml-auto gap-1">
        <p className="text-[10px] text-[#686768] font-[580]">
          {new Date(conversation.updatedAt).toLocaleTimeString()}
        </p>

        {/* <p
          className={` ${
            index % 2 ? "" : "hidden"
          } rounded-full text-center w-[14px] h-[14px] bg-[#5B96F7] text-white text-[10px] ml-auto`}
        >
          {index}
        </p> */}
      </div>
    </div>
  );
};

export default ConversationCard;