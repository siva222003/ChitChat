import socketio from "socket.io-client";

const url = "https://chitchat-production-78a7.up.railway.app";

// const url = "http://localhost:3000";


const token = localStorage.getItem("accessToken");

const socket = socketio(url, {
  transports: ['websocket'],
  withCredentials: true,
  auth: token ? JSON.parse(token) : {},
});

export default socket;
