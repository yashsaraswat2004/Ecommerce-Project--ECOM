import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./state/Store.js";
import { Auth0Provider } from "@auth0/auth0-react";
import { CartProvider } from "./customer/context/CartContext.js";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <Auth0Provider
          domain="dev-n3pazb0ms4cb3sxl.us.auth0.com"
          clientId="K7R1D2EOzIdAKoPVtMeowvwMQMtvcjIC"
          authorizationParams={{
            redirect_uri: window.location.origin,
          }}
        >
          <CartProvider>
            <App />
          </CartProvider>
        </Auth0Provider>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);
