import React from "react";
import ArticleList from "../articles/ArticleList";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import ArticleDetail from "../articles/ArticleDetail";

const App: React.FC = () => {
  return (
    <React.Fragment>
      <Router>
        <Switch>
          <Route exact path="/" component={ArticleList} />
          <Route exact path="/articles/:id" component={ArticleDetail} />
        </Switch>
      </Router>
    </React.Fragment>
  );
};

export default App;
