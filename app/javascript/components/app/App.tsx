import React from "react";
import ArticleList from "../articles/ArticleList";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

const routes = [
  {
    path: "/",
    exact: true,
    component: () => <ArticleList />,
  },
];

const App: React.FC = () => {
  return (
    <React.Fragment>
      <Router>
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
  );
};

export default App;
