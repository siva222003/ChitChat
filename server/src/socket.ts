import { Server, Socket } from "socket.io";
import { IUser } from "../interfaces/userI";
import { DefaultEventsMap } from "socket.io/dist/typed-events";
import { User } from "../models";

interface CustomSocket extends Socket {
  user?: IUser;
}

export const socketConnection = (
  io: Server<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>
) => {
  // const onlineUsers = new Map<string, string>();
  const onlineUsers = new Set<string>();
  const onlineUserIds = new Map<string, string>();
  io.on("connection", async (socket: CustomSocket) => {
    //onlineUsers.set(socket.id, socket.id);
    
     /**
     * @Online
     */
    socket.on("online", (user) => {
      socket.user = user;
      onlineUsers.add(user._id);
      onlineUserIds.set(socket.id, user._id);
      console.log(`User online: ${socket.user?.firstName}`);
      console.log("After Online",onlineUsers)
      io.emit("online", Array.from(onlineUsers));
    });

  
    /**
     * @One_To_One_Chat
     */

    socket.on("chat message", (message) => {
      socket.broadcast.emit("chat message", `${message} - ${socket.id}`); // Broadcast the message to all connected clients
    });

    /**
     * @Friend_Req_Sent
     */

    socket.on("friend request", (message) => {
      io.emit("friend request", `${message} - ${socket.id}`); // Broadcast the message to all connected clients
    });

    /**
     * @Group_Chat
     */

    /**
     * @On_Typing
     */

    /**
     * @Off_Typing
     */

    /**
     * @Group_Add
     */

    /**
     * @Group_Remove
     */


    // Handle user disconnection
    socket.on("disconnect", () => {
      onlineUsers.delete(onlineUserIds.get(socket.id) as string);
      console.log(`User offline: ${socket.user?.firstName}`);
      console.log("After Offline",onlineUsers)
      io.emit("online", Array.from(onlineUsers));
    });
  });
};
