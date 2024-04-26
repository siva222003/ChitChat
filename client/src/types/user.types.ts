export type UserType = {
  statusCode: number;
  data: {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    verified: boolean;
    avatar: string;
    friends: FriendsType[];
    createdAt: string;
    updatedAt: string;
    __v: number;
  };
} | null;

export type UserDataType = {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  verified: boolean;
  avatar: string;
  friends: string[];
  createdAt: string;
  updatedAt: string;
  __v: number;
} | null;

export type FriendsType = {
  id: string;
  firstName: string;
  avatar: string;
};
