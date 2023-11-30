import React from "react";
import ReactDOM from "react-dom/client";
import App from ".";
import "./App.css";
import "./index.css";
import { AuthProvider } from "@asgardeo/auth-react";

interface Config {
  redirectUrl: string;
  asgardeoClientId: string;
  asgardeoBaseUrl: string;
  choreoApiUrl: string;
}

declare global {
  interface Window {
    config: Config;
  }
}

const authConfig = {
  signInRedirectURL: window.config.redirectUrl,
  signOutRedirectURL: window.config.redirectUrl,
  clientID: window.config.asgardeoClientId,
  baseUrl: window.config.asgardeoBaseUrl,
  scope: ["openid", "profile"],
};

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <AuthProvider config={authConfig}>
      <App />
    </AuthProvider>
  </React.StrictMode>
);
