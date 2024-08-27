import React, { useEffect, useState } from "react";
import {
  useLocation,
  Route,
  Switch,
  Redirect,
  useHistory,
} from "react-router-dom";
import AdminNavbar from "components/Navbars/AdminNavbar";
import Footer from "components/Footer/Footer";
import Sidebar from "components/Sidebar/Sidebar.js";
import sidebarImage from "assets/img/sidebar-5.jpg";
// import Routes from "../routes.js";
// import routes from "../routes.js";
import Routes from "../routes-api.js";

function Admin() {
  const [image, setImage] = React.useState(sidebarImage);
  const [color, setColor] = React.useState("black");
  const [hasImage, setHasImage] = React.useState(true);

  const location = useLocation();
  const mainPanel = React.useRef(null);
  const history = useHistory();

  // Menggunakan useEffect untuk memastikan pengguna diarahkan kembali ke halaman login jika tidak login
  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    const token = localStorage.getItem("token");

    if (isLoggedIn !== "true" || !token) {
      // Jika tidak login, arahkan ke halaman login dan hapus riwayat navigasi
      history.replace("/login");
    }
  }, [history]);

  // Mengatur navigasi agar tidak bisa kembali setelah logout
  useEffect(() => {
    const handleBackButton = () => {
      history.push("/login"); // Mengarahkan kembali ke halaman login saat tombol kembali ditekan
    };

    window.history.pushState(null, "", window.location.pathname); // Mengganti URL tanpa menambahkan riwayat
    window.addEventListener("popstate", handleBackButton);

    return () => {
      window.removeEventListener("popstate", handleBackButton);
    };
  }, []);

  const routes = Routes();
  
  const getRoutes = (routes) => {
    let result = [];
    routes.forEach((prop, key) => {
      if (prop.routesInbound) {
        prop.routesInbound.forEach((route, index) => {
          result.push(
            <Route
              path={route.layout + route.path}
              render={(props) => <route.component {...props} />}
              key={index}
            />
          );
        });
      }
      if (prop.routesOutbound) {
        prop.routesOutbound.forEach((route, index) => {
          result.push(
            <Route
              path={route.layout + route.path}
              render={(props) => <route.component {...props} />}
              key={index}
            />
          );
        });
      }
      if (prop.routes) {
        prop.routes.forEach((route, index) => {
          result.push(
            <Route
              path={route.layout + route.path}
              render={(props) => <route.component {...props} />}
              key={index}
            />
          );
        });
      }
    });
    return result;
  };

  return (
    <>
      <div className="wrapper">
        <Sidebar color={color} image={hasImage ? image : ""} routes={routes} />
        <div className="main-panel" ref={mainPanel}>
          <AdminNavbar />
          <div className="content">
            <Switch>
              {getRoutes(routes)}
              <Redirect from="/admin" to="/admin/dashboard" />
            </Switch>
          </div>
          <Footer />
        </div>
      </div>
    </>
  );
}

export default Admin;
