// import { contacts } from "./constants";

export const sortContacts = (contacts: any) => {

  if (contacts === undefined) return [];

  const sortedNames = contacts.map((obj: any) => obj.firstName).sort();
  const sortedContacts = sortedNames.map((name: string) => {
    return contacts.find((obj: any) => obj.firstName === name);
  });
  if (sortedContacts === undefined) return contacts;
  return sortedContacts;
};

export const isObjectEmpty = (objectName: any) => {
  return (
    Object.keys(objectName).length === 0 && objectName.constructor === Object
  );
};
