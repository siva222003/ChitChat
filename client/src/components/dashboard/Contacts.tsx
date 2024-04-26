import React, { useMemo } from "react";
import { sortContacts } from "../../utils/helper";
import { Contacts } from "../../types/chat.types";

const Contacts = () => {
  const contacts = useMemo(() => sortContacts(), []);

  let currentAlphabet = "";

  const contactElement = (contact: Contacts, index: number) => {
    return (
      <div
        // onContextMenu={(e) => onMenuClick(e)}
        key={index}
        className="w-full flex my-3 bg-white rounded-lg py-3 px-3 gap-3"
      >
        <img
          className="inline-block h-10 w-10 rounded-full ring-2 ring-white"
          src={contact?.src}
          alt=""
        />

        <div className="flex flex-col justify-center">
          <h4 className="text-[13px] font-semibold text-[#030303]">
            {contact?.name}
          </h4>
          <p className="text-xs text-[#7C7C7D]">{contact?.content}</p>
        </div>
      </div>
    );
  };

  const contactElements = contacts.map((contact: Contacts, index) => {
    const firstAlphabet = contact?.name[0].toUpperCase() || "";
    if (firstAlphabet !== currentAlphabet) {
      currentAlphabet = firstAlphabet;
      return (
        <React.Fragment key={firstAlphabet}>
          <h2 className="text-[#709CE6] ml-2">{firstAlphabet}</h2>
          {contactElement(contact, index)}
        </React.Fragment>
      );
    }
    return contactElement(contact, index);
  });

  return <div>
    {contactElements}
  </div>;
};

export default Contacts;
