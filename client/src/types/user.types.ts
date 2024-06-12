export type UserType = {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  about: string;
  verified: boolean;
  avatar: string;
  friends: FriendsType[];
  notifications: string[];
  createdAt: string;
  updatedAt: string;
  __v: number;
};

export type FriendsType = {
  id: string;
  firstName: string;
  avatar: string;
};

export type ContactType = {
  _id: string;
  firstName: string;
  about: string;
  avatar: "";
};

export type NotificationsType = {
  _id: string;
  sender: {
    _id: string;
    firstName: string;
    avatar: string;
  };
};
