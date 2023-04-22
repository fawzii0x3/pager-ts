import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { Provider, createClient, fetchExchange, } from "urql";

const url = "http://localhost:5000/api";

const client = createClient({
  url,
  exchanges: [fetchExchange],
});

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Provider value={client}>
      <App />
    </Provider>
  </React.StrictMode>
);
