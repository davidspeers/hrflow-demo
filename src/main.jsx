import App from "@components/App/App";
import store from "@stores/store";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <App />
  </Provider>,
);
