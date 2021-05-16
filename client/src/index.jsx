import "react-app-polyfill/ie11";
import "react-app-polyfill/stable";
// import "core-js";
import React from "react";
import ReactDOM from "react-dom";
// import "./index.css";
import "./program.css";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import store from "./redux/store";
import { StylesProvider } from "@material-ui/core/styles";
import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import { primary, secondary, tertiary } from "./styledComponent/Variables";
import { apiClient } from "./utils/data/api";
import GlobalStyles from "./styledComponent/GlobalStyles";
import "./index.css";

window.VIDEOJS_NO_DYNAMIC_STYLE = true;

const theme = createMuiTheme({
  palette: {
    primary: {
      main: primary,
    },
    secondary: {
      main: secondary,
    },
    error: {
      main: secondary,
    },
    info: {
      main: tertiary,
    },
  },
  spacing: 10,
  // zIndex: {
  //   modal: 3000,
  // },
});
apiClient.get("/log/visit");
ReactDOM.render(
  // <React.StrictMode>
  <Router>
    {/* <SnackbarProvider
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      maxSnack={3}
      content={(key, message) => <SnackMessage id={key} {...message} />}
    > */}
    <StylesProvider injectFirst>
      <ThemeProvider theme={theme}>
        <Provider store={store}>
          <App />

          <GlobalStyles />
        </Provider>
      </ThemeProvider>
    </StylesProvider>
    {/* </SnackbarProvider> */}
  </Router>,

  //  </React.StrictMode>

  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
