import dotenv from "dotenv";
import path from "path";
const envPath = path.resolve(__dirname, "../config.env"); //irrespective CWD path is fixed
dotenv.config({ path: envPath });
import http, { METHODS } from "http";
import { Server } from "socket.io";
import env from "../utils/validateEnv";
import app from "./app";
const server = http.createServer(app);


const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
  },
});

io.on("connection", (socket) => {
  console.log(`User connected: ${socket.id}`);

  // Handle incoming messages
  socket.on("chat message", (message) => {
    io.emit("send message", `${message},ID : ${socket.id}`); // Broadcast the message to all connected clients
  });
  // Handle user disconnection
  socket.on("disconnect", () => {
    console.log(`User disconnected: ${socket.id}`);
  });
});

const PORT = env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
