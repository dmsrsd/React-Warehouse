import React from "react";
import ReactDOM from "react-dom/client";

import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

// Import Bootstrap CSS
import "bootstrap/dist/css/bootstrap.min.css";

// Import stylesheets
import "./assets/css/animate.min.css";
import "./assets/scss/light-bootstrap-dashboard-react.scss?v=2.0.0";
import "./assets/css/demo.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

// Import layout components
import AdminLayout from "layouts/Admin.js";
import LoginLayout from "layouts/Login.js";
import RegisterLayout from "layouts/Register.js";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <BrowserRouter>
    <Switch>
      {/* Redirect default dari root path */}
      <Redirect exact from="/" to="/login" />

      {/* Route untuk halaman admin */}
      <Route path="/admin" render={(props) => <AdminLayout {...props} />} />

      {/* Route untuk halaman login */}
      <Route path="/login" render={(props) => <LoginLayout {...props} />} />

      {/* Route untuk halaman Register */}
      <Route path="/register" render={(props) => <RegisterLayout {...props} />} />

    </Switch>
  </BrowserRouter>
);
