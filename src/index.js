import { ApolloClient } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { HttpLink } from "apollo-link-http";
import { setContext } from "apollo-link-context";
import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import Amplify from "aws-amplify";
import config from "./aws-exports";
import gql from "graphql-tag";
import { ApolloProvider } from "react-apollo";

const cache = new InMemoryCache();
const httpLink = new HttpLink({
  uri:
    "https://3kqa2bt5qzg6rkbbgsuorywybq.appsync-api.us-west-2.amazonaws.com/graphql",
  headers: {
    "X-Api-Key": "da2-swaqwisp65e3nhnyu2swagorde"
  }
});

const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      authorization: `Bearer da2-swaqwisp65e3nhnyu2swagorde`
    }
  };
});

const client = new ApolloClient({
  cache,
  link: authLink.concat(httpLink)
});


Amplify.configure(config);

ReactDOM.render(
  <ApolloProvider client= {client}>
    <App client={client}/>
  </ApolloProvider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
