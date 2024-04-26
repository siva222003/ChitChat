import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { BrowserRouter as Router } from "react-router-dom";
import SocketProvider from "./providers/SocketProvider";
import AuthProvider from "./providers/AuthProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ChatProider from "./providers/ChatProvider";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Router>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <ChatProider>
            <SocketProvider>
              <App />
            </SocketProvider>
          </ChatProider>
        </AuthProvider>
      </QueryClientProvider>
    </Router>
  </React.StrictMode>
);
