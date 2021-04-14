import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { ThemeProvider } from "styled-components";

import Home from "./pages/Home";
import Results from "./pages/Results";
import { ROUTES } from "./constants";
import GuidedSteps from "./pages/GuidedSteps";
import AdvancedConfigurator from "./pages/AdvancedConfigurator";
import Header from "./components/Header";

const theme = {
  colors: {
    border: "#d9d9d9",
    error: "#ff0505",
  },
};

const queryClient = new QueryClient();

const MainRoute = ({ children }) => (
  <>
    <Header />
    {children}
  </>
);

function App(props) {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <Router>
          <Switch>
            <Route exact path="/results">
              <Results />
            </Route>
            <Route exact path={ROUTES.HOME}>
              <MainRoute>
                <Home />
              </MainRoute>
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
      </ThemeProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
