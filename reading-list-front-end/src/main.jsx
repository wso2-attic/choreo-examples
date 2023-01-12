import React from "react";
import ReactDOM from "react-dom/client";
import App from ".";
import "./App.css";
import "./index.css";
import { AuthProvider } from "@asgardeo/auth-react";
import { TokenExchangePlugin } from "@asgardeo/token-exchange-plugin";

const authConfig = {
  signInRedirectURL: import.meta.env.VITE_SIGNIN_REDIRECT_URL,
  signOutRedirectURL: import.meta.env.VITE_SIGNOUT_REDIRECT_URL,
  clientID: import.meta.env.VITE_ASG_CLIENT_ID,
  baseUrl: import.meta.env.VITE_BASE_URL,
  scope: ["openid", "profile"],
  resourceServerURLs: [
    import.meta.env.VITE_RESOURCE_SERVER_URL,
    import.meta.env.VITE_STS_TOKEN_ENDPOINT,
  ],
  stsConfig: {
    client_id: import.meta.env.VITE_CHOREO_CLIENT_ID,
    scope: ["openid", "profile"],
    orgHandle: import.meta.env.VITE_ORG_HANDLE,
  },
  stsTokenEndpoint: import.meta.env.VITE_STS_TOKEN_ENDPOINT,
};

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider
      config={authConfig}
      plugin={TokenExchangePlugin.getInstance()}
    >
      <App />
    </AuthProvider>
  </React.StrictMode>
);
