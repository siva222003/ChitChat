import { ContactType } from "./user.types";

export type MessageType = string;
export type DashboardType = DashboardEnum;

export type MemberType = Omit<ContactType, "about">;

export type ConversationType = {
  _id: string;
  isArchived: boolean;
  members: MemberType[];
  createdAt: Date;
  updatedAt: Date;
  lastMessage: MessageType;
};

export type GroupType = {
  name: string;
  content: string;
  src: string;
};

export enum DashboardEnum {
  Conversations = "Conversations",
  Groups = "Groups",
  Contacts = "Contacts",
  Archived = "Archived",
}
