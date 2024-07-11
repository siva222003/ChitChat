import socketio from "socket.io-client";

const token = localStorage.getItem("accessToken");
const url = import.meta.env.VITE_BASE_API_URL;

const socket = socketio(url, {
  transports: ['websocket'],
  withCredentials: true,
  auth: token ? JSON.parse(token) : {},
});

export default socket;
