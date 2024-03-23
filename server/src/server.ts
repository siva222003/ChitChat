import dotenv from "dotenv";
import path from "path";
const envPath = path.resolve(__dirname, "../config.env"); //irrespective CWD path is fixed
dotenv.config({ path: envPath });
import http, { METHODS } from "http";
import { Server, Socket } from "socket.io";
import env from "../utils/validateEnv";
import app from "./app"; 
import { User } from "../models";
import { connectToMongo } from "../db/conn";
import {IUser} from '../interfaces/userI'

interface CustomSocket extends Socket {
  user?: IUser; // Add your custom property, in this case 'user'
}


const server = http.createServer(app);


const io  = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
  },
});

io.on("connection", (socket: CustomSocket) => {
  console.log(`User connected: ${socket.id}`);

  socket.on('setup' , async (user) => {
    console.log(user)
    socket.user = user
    const modifyObj = {socketId: socket.id}
    await User.findByIdAndUpdate({_id: user._id},modifyObj)
  })

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

  /**
   * @Online_Offline
   */


  // Handle user disconnection
  socket.on("disconnect", () => {
    console.log(`User disconnected: ${socket.id}`);
  });



});

const PORT = env.PORT || 5000;

connectToMongo().then(() => {
  server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}).catch((error) => {
  console.log("ERROR : MongoDB Connection Failed" , error)
})

