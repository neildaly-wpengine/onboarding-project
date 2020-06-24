import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import APIConsumer from "../../common/api-consumer";
import { ArticleDetailMatchParams } from "../../common/types";
import ArticleDetail from "../articles/ArticleDetail";
import ArticleList from "../articles/ArticleList";

const App: React.FC = () => {
  const consumer = new APIConsumer();
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
