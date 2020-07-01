import { createMuiTheme, CssBaseline, ThemeProvider } from "@material-ui/core";
import React from "react";
import { Provider } from "react-redux";
import { createStore } from "redux";
import { rootReducer } from "../reducers";
import App from "./app/App";

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

const store = createStore(
  rootReducer,
  // @ts-ignore
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

const Index: React.FC = () => {
  return (
    <ThemeProvider theme={customTheme}>
      <CssBaseline />
      <Provider store={store}>
        <App />
      </Provider>
    </ThemeProvider>
  );
};

export default Index;
