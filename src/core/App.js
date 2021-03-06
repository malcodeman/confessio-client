import React from "react";
import { useSelector } from "react-redux";
import { Route } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { Router, Switch } from "react-router-dom";

import lightTheme from "./styles/themes/light";
import darkTheme from "./styles/themes/dark";
import history from "./routing/history";
import PrivateRoute from "./routing/PrivateRoute";
import Landing from "../features/landing/components/Landing";
import Home from "../features/home/containers/Home";

const Root = () => {
  if (localStorage.getItem("token") === null) {
    return <Landing />;
  }
  return <Home />;
};

const App = () => {
  const darkMode = useSelector((state) => state.settings.darkMode);
  const theme = darkMode ? darkTheme : lightTheme;

  return (
    <ThemeProvider theme={theme}>
      <Router history={history}>
        <Switch>
          <Route exact path="/" component={Root} />
          <Route path="/login" component={Landing} />
          <Route path="/:username" component={Home} />
          <PrivateRoute path="/settings" component={Home} />
        </Switch>
      </Router>
    </ThemeProvider>
  );
};

export default App;
