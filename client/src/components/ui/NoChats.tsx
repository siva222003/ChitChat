import React from "react";
import no_chat from "../../assets/images/no_chat.svg";
const NoChats = () => {
  return (
    <div className="h-full gap-8 w-full flex flex-col justify-center items-center">
      <img src={no_chat} alt="" />
      <p className="text-[13px] font-semibold">
        Start a new conversation or start a{" "}
        <button className="text-[#5B96F7]">new one</button>
      </p>
    </div>
  );
};

export default NoChats;
