import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history"; //administra el historial de sesiones, historial (creo que guarda en un objeto el historial)
import { Router, Route, Switch } from "react-router-dom"; //maneja las cargas de las rutas

import "assets/css/material-dashboard-react.css";

import indexRoutes from "routes/index.jsx"; //rutas principales pueden haber varias apps
import App from "containers/App/App.jsx";

const hist = createBrowserHistory();

ReactDOM.render(
  <Router history={hist}>
    <Switch>
      {indexRoutes.map((prop, key) => {
          return <Route path={prop.path} component={prop.component} key={key} />;
      })}
    </Switch>
  </Router>,
  //<App/>,
  document.getElementById("root")
);
