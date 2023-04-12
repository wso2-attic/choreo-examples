import React from "react";
import ReactDOM from "react-dom/client";
import App from ".";
import "./App.css";
import "./index.css";
import { AuthProvider } from "@asgardeo/auth-react";

const authConfig = {
  signInRedirectURL: import.meta.env.VITE_REDIRECT_URL,
  signOutRedirectURL: import.meta.env.VITE_REDIRECT_URL,
  clientID: import.meta.env.VITE_ASGARDEO_CLIENT_ID,
  baseUrl: import.meta.env.VITE_ASGARDEO_BASE_URL,
  scope: ["openid", "profile"],
};

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <AuthProvider config={authConfig}>
      <App />
    </AuthProvider>
  </React.StrictMode>
);
