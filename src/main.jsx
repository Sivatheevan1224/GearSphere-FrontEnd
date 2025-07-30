import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import axios from "axios";

// Fix CORS credentials issue - this is essential for session management
axios.defaults.withCredentials = true;

const root = document.getElementById("root");
if (!root) {
  throw new Error("Root element not found");
}

ReactDOM.createRoot(root).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
