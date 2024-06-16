import { Server, Socket } from "socket.io";
import { IUser } from "../interfaces/userI";
import { DefaultEventsMap } from "socket.io/dist/typed-events";

interface SocketUser extends IUser {
  _id: string;
}

interface CustomSocket extends Socket {
  user?: SocketUser;
}

const onlineUsers = new Set<string>();
export const onlineUserIds = new Map<string, string>();

export const socketConnection = (
  io: Server<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>
) => {
  io.on("connection", async (socket: CustomSocket) => {


    /*---------------- User Connected ------------------*/
    socket.on("online", (user) => {
      socket.user = user;
      onlineUsers.add(user._id);
      onlineUserIds.set(user._id, socket.id);
      console.log(`User online: ${socket.user?.firstName}`);
      console.log("After Online", onlineUsers);
      io.emit("online", Array.from(onlineUsers));
    });



    /*---------------- Chat Message ------------------*/
    // socket.on("chat message", ({message,id}) => {
    //   const userSocketId = onlineUserIds.get(id) as string;
    //   io.to(userSocketId).emit("chat message", message);
    // });





    /*---------------- User Disconnected ------------------*/
    socket.on("disconnect", () => {
      if (socket.user) {
        onlineUsers.delete(socket.user._id);
        onlineUserIds.delete(socket.user._id);
      }
      console.log(`User offline: ${socket.user?.firstName}`);
      console.log("After Offline", onlineUsers);
      io.emit("online", Array.from(onlineUsers));
    });
  });
};
