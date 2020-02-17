import React from "react";
import "./App.css";
import { API, graphqlOperation } from "aws-amplify";
import { Query } from "react-apollo";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Layout from './pages/layout';
// import { createBrowserHistory } from "history";
// const emps = await API.graphql(graphqlOperation(query));

 // const history = createBrowserHistory();

function App(props) {
  return (
            <Layout  {...props}/>
  );
}

export default App;
