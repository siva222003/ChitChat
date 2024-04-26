import { contacts } from "./constants";

export const sortContacts = () => {
  const sortedNames = contacts.map((obj) => obj.name).sort();
  const sortedContacts = sortedNames.map((name) => {
    return contacts.find((obj) => obj.name === name);
  });
  if(sortedContacts === undefined) return contacts;
  return sortedContacts;
};
