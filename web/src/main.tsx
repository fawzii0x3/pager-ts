import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { Provider,  createClient, fetchExchange,cacheExchange } from "urql";
// import { authExchange } from "@urql/exchange-auth";
// import { cacheExchange } from '@urql/exchange-graphcache';
import { MeUserDocument } from "./gql/graphql.tsx";
const url = "http://localhost:5000/api";

const client = createClient({
  url,
  exchanges: [
    fetchExchange,
    cacheExchange
  ],
  fetchOptions:{
    credentials:"include"
  }
});

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  // <React.StrictMode>
    <Provider value={client}>
      <App />
    </Provider>
  // </React.StrictMode>
);
