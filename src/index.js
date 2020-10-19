import React from "react";
import ReactDOM from "react-dom";
import { ToastProvider, Alert } from "./useToast";
import App from "./App";

import "./index.css";
import "./toaster.css";

const MyCustomAlert = Alert;

ReactDOM.render(
  <React.StrictMode>
    <ToastProvider
      DefaultToast={MyCustomAlert}
      maximum={5}
      portal={document.body}
    >
      <App />
    </ToastProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
