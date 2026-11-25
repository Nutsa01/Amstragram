import React from "react";
import ReactDOM from "react-dom/client";
import Appli from "./composants/Appli";
import "./index.scss";
import NotificationProvider from "./composants/Notifications";

ReactDOM.createRoot(document.getElementById("racine")).render(
  <React.StrictMode>
    <NotificationProvider>
      <Appli />
    </NotificationProvider>
  </React.StrictMode>
);
