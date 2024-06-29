import socketio from "socket.io-client";

// const socket = socketio("https://chitchat-production-78a7.up.railway.app");
const url = "https://chitchat-production-78a7.up.railway.app";

const token = localStorage.getItem("accessToken");

const socket = socketio(url, {
  withCredentials: true,
  auth: token ? JSON.parse(token) : {},
});

export default socket;
