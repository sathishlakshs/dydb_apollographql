import React from "react";
import "./App.css";
import { API, graphqlOperation } from "aws-amplify";
import { Query } from "react-apollo";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./pages/home";
import Empform from "./pages/empform";
// const emps = await API.graphql(graphqlOperation(query));

function App(props) {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/form">
            <Empform client={props.client} />
          </Route>
          <Route path="/">
            <Home client={props.client}/>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
