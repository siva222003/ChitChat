import React from "react";
import Search from "../ui/Search";
import { ArchiveBox } from "phosphor-react";

const ContactsHeader = () => {
  return (
    <div className=" pb-3 border-b-[1px]">
      
      <div className="flex justify-between items-center">
      <h1 className="font-bold text-[2rem] ">Chats</h1>
      <span className="w-6 h-6 border-[#676667] border-2 rounded-full border-dashed"></span>
      </div>

     <Search />

     <div className="flex gap-3 items-center">
        <ArchiveBox size={22} />
        <p className="text-[#709CE6] text-[13px] font-semibold">Archived</p>
      </div>

    </div>
  );
};

export default ContactsHeader;
