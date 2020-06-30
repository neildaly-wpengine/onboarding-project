import CssBaseline from "@material-ui/core/CssBaseline";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import React, { useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import APIConsumer from "../../common/api-consumer";
import { ArticleDetailMatchParams } from "../../common/types";
import ArticleDetail from "../articles/ArticleDetail";
import ArticleList from "../articles/ArticleList";
import Registration from "../auth/Registration";
import Navbar from "../nav/Navbar";

const customTheme = createMuiTheme({
  palette: {
    primary: {
      main: "#212121",
    },
    secondary: {
      main: "#EA80FC",
      dark: "#B64EC8",
    },
  },
});

const App: React.FC = () => {
  const [authenticated, setAuthenticated] = useState<boolean>(false);

  const toggleAuthentication = () => {
    setAuthenticated(!authenticated);
  };

  const consumer: APIConsumer = new APIConsumer();
  const routes = [
    {
      path: "/",
      exact: true,
      component: () => <ArticleList consumer={consumer} />,
    },
    {
      path: "/articles/:id",
      exact: true,
      component: (props: ArticleDetailMatchParams) => (
        <ArticleDetail {...props} consumer={consumer} />
      ),
    },
    {
      path: "/register",
      exact: true,
      component: () => (
        <Registration
          consumer={consumer}
          toggleAuthentication={toggleAuthentication}
        />
      ),
    },
  ];

  return (
    <ThemeProvider theme={customTheme}>
      <React.Fragment>
        <CssBaseline />
        <Router>
          <Navbar
            authenticated={authenticated}
            consumer={consumer}
            toggleAuthentication={toggleAuthentication}
          />
          <Switch>
            {routes.map((route, index) => (
              <Route
                key={index}
                exact={route.exact}
                path={route.path}
                component={route.component}
              />
            ))}
          </Switch>
        </Router>
      </React.Fragment>
    </ThemeProvider>
  );
};

export default App;
