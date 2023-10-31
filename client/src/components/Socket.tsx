import io from "socket.io-client";
export const socket = io("http://localhost:3000");

// import React, { useEffect, useState } from "react";
// import { socket } from "./components/Socket";
// const App = () => {
//   const [messages, setMessages] = useState<string[]>([]);
//   const [message, setMessage] = useState("");
//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setMessage(e.target.value);
//   };
//   const handleClick = () => {
//     socket.emit("chat message", message);
//   };

//   useEffect(() => {
//     const onConnect = () => {
//       console.log("Client connected");
//     };
//     const onReceiveMsg = (message: string) => {
//       setMessages((prev) => [...prev, message]);
//     };
//     socket.on("connect", onConnect);
//     socket.on("send message", onReceiveMsg);
//     return () => {
//       socket.off("connect", onConnect);
//       socket.off("send message", onReceiveMsg);
//     };
//   }, []);

//   return (
//     <div className=" m-10">
//       <input
//         type="text"
//         className="border-2"
//         onChange={handleChange}
//         value={message}
//       />
//       <button
//         onClick={handleClick}
//         className="mx-2 bg-blue-400 w-20 h-8 cursor-pointer rounded-lg "
//       >
//         Send
//       </button>
//       <div>
//         {messages.map((e) => {
//           return <h2 key={e}>{e}</h2>;
//         })}
//       </div>
//     </div>
//   );
// };

// export default App;