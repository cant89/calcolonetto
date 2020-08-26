import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Home from "./pages/Home";
import Results from "./pages/Results";
import Header from "./components/Header";

function App(props) {
  return (
    <Router>
      <Header />
      <Switch>
        <Route exact path="/results">
          <Results />
        </Route>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/">
          <Redirect to="/" />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
