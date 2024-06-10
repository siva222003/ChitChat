import React from "react";
import { Contact } from "../../../types/chat.types";
import UserCard from "./UserCard";

interface ContactListProps {
  contacts: Contact[];
}

const ContactList = ({ contacts }: ContactListProps) => {
  let currentAlphabet = "";
  return (
    <>
      {contacts.map((contact: Contact, index) => {
        const firstAlphabet = contact?.firstName[0].toUpperCase() || "";
        if (firstAlphabet !== currentAlphabet) {
          currentAlphabet = firstAlphabet;
          return (
            <React.Fragment key={index}>
              <h2 className="text-[#709CE6] ml-2">{firstAlphabet}</h2>
              <UserCard user={contact} />
            </React.Fragment>
          );
        }
        return <UserCard key={firstAlphabet} user={contact} />;
      })}
    </>
  );
};

export default ContactList;
