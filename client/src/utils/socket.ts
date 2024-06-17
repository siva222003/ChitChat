import socketio from "socket.io-client";

const socket = socketio("https://chitchat-production-78a7.up.railway.app");

export default socket;