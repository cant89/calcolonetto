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
import { ROUTES } from "./constants";
import GuidedSteps from "./pages/GuidedSteps";
import AdvancedConfigurator from "./pages/AdvancedConfigurator";

function App(props) {
  return (
    <Router>
      <Header />
      <Switch>
        <Route exact path="/results">
          <Results />
        </Route>
        <Route exact path={ROUTES.HOME}>
          <Home />
        </Route>
        <Route exact path={ROUTES.GUIDED_STEPS}>
          <GuidedSteps />
        </Route>
        <Route exact path={ROUTES.ADVANCED_CONFIGURATOR}>
          <AdvancedConfigurator />
        </Route>
        <Route path="/">
          <Redirect to="/" />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
