export type Message = string;
export type Dashboard = DashboardEnum

export type Conversation = {
  name: string;
  content: string;
  src: string;
};
export type Group = {
    name: string;
    content: string;
    src: string;
  };

export type Contact = {
    _id: string;
    firstName: string;
    about: string;
    avatar: "";
  } | undefined;

  
  export enum DashboardEnum {
    Conversations = "Conversations",
    Groups = "Groups",
    Contacts = "Contacts",
    Archived = "Archived",
  } 