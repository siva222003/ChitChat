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

export const io = new Server(server, {
  cors: {
    origin: env.CORS_ORIGIN,
  },
});

app.set("io", io);

socketConnection(io);

const PORT = 3000;

connectToMongo()
  .then(() => {
    server.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.log("ERROR : MongoDB Connection Failed", error);
  });
