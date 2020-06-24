import React from "react";
import ArticleList from "../articles/ArticleList";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import ArticleDetail from "../articles/ArticleDetail";
import APIConsumer from "../../common/api-consumer";

const App: React.FC = () => {
  const consumer = new APIConsumer();
  const routes = [
    {
      path: "/",
      exact: true,
      component: () => <ArticleList consumer={consumer} />,
    },
    {
      path: "/article/:id",
      exact: true,
      component: () => <ArticleDetail consumer={consumer} />,
    },
  ];

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
