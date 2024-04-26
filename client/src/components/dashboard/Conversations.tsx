// import React, { useEffect } from "react";
// import { conversations } from "../../utils/constants";
// import { Conversations } from "../../types/chat.types";
// import useAuth from "../../hooks/useAuth";

// type ConversationsProps = {
//   conversations?: Conversations[];
//   archived?: boolean;
// };

// const element = (conversations: Conversations[]) => {

//   const {user} = useAuth()

//   return (
//     <div>
//       {conversations.map((e: Conversations, index: number) => {
//         return (
//           <div
//             key={index}
//             className="w-full flex my-3 bg-white rounded-lg py-3 px-3 gap-3 cursor-pointer hover:bg-slate-100"
//           >
//             <div className="h-10 w-10 rounded-full relative">
//               <img
//                 className="inline-block h-10 w-10 rounded-full"
//                 src={e.src}
//                 alt=""
//               />
//               {index % 2 === 0 && (
//                 <span className="absolute bottom-0 right-1 bg-[#76D45E] w-2 h-2 rounded-full"></span>
//               )}
//             </div>

//             <div>
//               <h4 className="text-[13px] font-semibold text-[#030303]">
//                 {e.name}
//               </h4>
//               <p className="text-xs text-[#7C7C7D]">{e.content}</p>
//             </div>

//             <div className="flex flex-col justify-center ml-auto gap-1">
//               <p className="text-[10px] text-[#686768] font-[580]">9:36 PM</p>

//               <p
//                 className={` ${
//                   index % 2 ? "" : "hidden"
//                 } rounded-full text-center w-[14px] h-[14px] bg-[#5B96F7] text-white text-[10px] ml-auto`}
//               >
//                 {index}
//               </p>
//             </div>
//           </div>
//         );
//       })}
//     </div>
//   );
// };

// const Conversations = ({
//   conversations: archivedConversations = [],
//   archived = false,
// }: ConversationsProps) => {
//   return (
//     <div>
//       {archived ? (
//         <div>{element(archivedConversations)}</div>
//       ) : (
//         <>
//           <div className="py-3">
//             <p className="text-[13px] font-semibold text-[#676667]">Pinned</p>
//             {element(conversations)}
//           </div>
//           <div className="py-4">
//             <p className="text-[13px] font-semibold text-[#676667]">
//               All Chats
//             </p>
//             {element(conversations)}
//           </div>
//         </>
//       )}
//     </div>
//   );
// };

// export default Conversations;


import { Conversations } from "../../types/chat.types";
import useAuth from "../../hooks/useAuth";
import { FriendsType, UserDataType, UserType } from "../../types/user.types";
import useChat from "../../hooks/useChat";
import { useSocket } from "../../hooks/useSocket";

type ConversationsProps = {
  conversations?: Conversations[];
  archived?: boolean;
};

const element = (conversations: (FriendsType[] | undefined)) => {
  const {setCurrentChat} = useChat()
  const {onlineUsers} = useSocket()

  return (
    <div>
      {conversations?.map((e: FriendsType , index: number) => {
        return (
          <div
            onClick={() => setCurrentChat(e)}
            key={index}
            className="w-full flex my-3 bg-white rounded-lg py-3 px-4 gap-3 cursor-pointer hover:bg-slate-100"
          >
            <div className="h-10 w-10 rounded-full relative">
              <img
                className="inline-block h-10 w-10 rounded-full"
                src={e?.avatar}
                alt=""
              />
              {onlineUsers.includes(e.id) && (
                <span className="absolute bottom-0 right-1 bg-[#76D45E] w-2 h-2 rounded-full"></span>
              )}
            </div>

            <div>
              <h4 className="text-[13px] font-semibold text-[#030303]">
                {e?.firstName}
              </h4>
              <p className="text-xs text-[#7C7C7D]">Lorem, ipsum dolor.</p>
            </div>

            <div className="flex flex-col justify-center ml-auto gap-1">
              <p className="text-[10px] text-[#686768] font-[580]">9:36 PM</p>

              <p
                className={` ${
                  index % 2 ? "" : "hidden"
                } rounded-full text-center w-[14px] h-[14px] bg-[#5B96F7] text-white text-[10px] ml-auto`}
              >
                {index}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

const Conversations = ({
  conversations: archivedConversations = [],
  archived = false,
}: ConversationsProps) => {
  const { user } = useAuth();
  return (
    <div>
      {archived ? (
        // <div>{element(archivedConversations)}</div>
        <div>Archived</div>
      ) : (
        <>
          {/* <div className="py-3">
            <p className="text-[13px] font-semibold text-[#676667]">Pinned</p>
            {element(conversations)}
          </div> */}
          <div className="py-4">
            <p className="text-[13px] font-semibold text-[#676667]">
              All Chats
            </p>
            {element(user?.data?.friends)}
          </div>
        </>
      )}
    </div>
  );
};

export default Conversations;
