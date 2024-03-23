import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { BrowserRouter as Router } from "react-router-dom";
import SocketProvider from "./providers/SocketProvider";
import AuthProvider from "./providers/AuthProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Router>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          {/* <SocketProvider> */}
            <App />
          {/* </SocketProvider> */}
        </AuthProvider>
      </QueryClientProvider>
    </Router>
  </React.StrictMode>
);
