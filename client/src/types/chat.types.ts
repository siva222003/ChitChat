export type Message = string;
export type Dashboard = DashboardEnum
export type Conversations = {
  name: string;
  content: string;
  src: string;
};
export type Groups = {
    name: string;
    content: string;
    src: string;
  };

export type Contacts = {
    name: string;
    content: string;
    src: string;
  } | undefined;

  export enum DashboardEnum {
    Conversations = "Conversations",
    Groups = "Groups",
    Contacts = "Contacts",
    Archived = "Archived",
  } 