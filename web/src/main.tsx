import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { Provider, createClient, fetchExchange } from "urql";
import { cacheExchange } from "@urql/exchange-graphcache";
import { LoginMutation, MeUserDocument } from "./gql/graphql.tsx";
import { RegisterMutation } from "./gql/graphql.tsx";
import betterUpdateQuery from "./utils/BetterUpdateQuery.ts";

const url = "http://localhost:5000/api";


const client = createClient({
  url,
  exchanges: [
    cacheExchange({
      updates: {
        Mutation: {
          login: (_result, args, cache, info) => {
            betterUpdateQuery<LoginMutation, any>(
              cache,
              { query: MeUserDocument },
              _result,
              (result, query) => {
                if (result.login.errors) {
                  return query;
                } else {
                  return {
                    MeUser: result.login.user,
                  };
                }
              }
            );
          },
          register: (_result, args, cache, info) => {
            betterUpdateQuery<RegisterMutation, any>(
              cache,
              { query: MeUserDocument },
              _result,
              (result, query) => {
                if (result.register.errors) {
                  return query;
                } else {
                  return {
                    MeUser: result.register.user,
                  };
                }
              }
            );
          },
        },
      },
    }) as any,
    fetchExchange,
  ],
  fetchOptions: {
    credentials: "include",
  },
});

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  // <React.StrictMode>
  <Provider value={client}>
    <App />
  </Provider>
  // </React.StrictMode>
);
