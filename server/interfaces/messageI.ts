
export interface IMessage {

    senderId: string;
    receiverId: string;
    message: string;
    read: boolean;
    deleted: boolean;
    deletedAt: Date;
    delivered: boolean;
    deliveredAt: Date;
    deliveredTo: string;
    deliveredFrom: string;
    deliveredToAt: Date;
    deliveredFromAt: Date;
    deliveredToFrom: string;
    deliveredFromTo: string
}