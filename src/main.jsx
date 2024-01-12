import App from "@components/App/App";
import store from "@stores/store";
import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux"; // Import the Provider component from the 'react-redux' package
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
);
