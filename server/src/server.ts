import dotenv from "dotenv";
import path from "path";
const envPath = path.resolve(__dirname, "../config.env"); //irrespective CWD path is fixed
dotenv.config({ path: envPath });
import http from "http";
import { Server } from "socket.io";
import env from "../utils/validateEnv";
import app from "./app";
import { connectToMongo } from "../db/conn";
import { socketConnection } from "./socket";
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
  },
});

socketConnection(io);

const PORT =  5000;

connectToMongo()
  .then(() => {
    server.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.log("ERROR : MongoDB Connection Failed", error);
  });
