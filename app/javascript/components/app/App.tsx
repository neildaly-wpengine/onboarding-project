import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { logout, setAuthDetails } from "../../actions";
import APIConsumer from "../../common/api-consumer";
import { ArticleDetailMatchParams, AuthStore } from "../../common/types";
import ArticleDetail from "../articles/ArticleDetail";
import ArticleList from "../articles/ArticleList";
import Registration from "../auth/Registration";
import Navbar from "../nav/Navbar";
import Login from "../auth/Login";

const App: React.FC = () => {
  const consumer: APIConsumer = new APIConsumer();
  const auth: AuthStore = useSelector((state: any) => state.auth);
  const userInitials: string = `${auth.user.firstName.charAt(
    0
  )}${auth.user.lastName.charAt(0)}`.toUpperCase();
  const dispatch = useDispatch();

  const notifyLogin = (authStore: AuthStore) => {
    dispatch(setAuthDetails(authStore));
  };

  const notifyLogout = () => {
    dispatch(logout());
  };

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
        <Registration consumer={consumer} notifyLogin={notifyLogin} />
      ),
    },
    {
      path: "/login",
      exact: true,
      component: () => <Login consumer={consumer} notifyLogin={notifyLogin} />,
    },
  ];

  return (
    <React.Fragment>
      <Router>
        <Navbar
          authenticated={auth.authenticated}
          consumer={consumer}
          notifyLogout={notifyLogout}
          userInitials={userInitials}
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
  );
};

export default App;
