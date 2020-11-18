import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";

//import redux from 'redux';
//import { connect } from 'react-redux'

import reportWebVitals from "./reportWebVitals";

import { Provider } from "react-redux";
//import { createStore } from 'redux'

import store from "./store";

import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import uaLocale from "date-fns/locale/uk";

ReactDOM.render(
  <MuiPickersUtilsProvider utils={DateFnsUtils} locale={uaLocale}>
    <Provider store={store}>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </Provider>
  </MuiPickersUtilsProvider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
