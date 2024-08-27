import React, { useState, useEffect } from "react";
import { useLocation, useHistory } from "react-router-dom";
import { Nav, Dropdown } from "react-bootstrap";
import "../../styling/Sidebar-Custom.css";

function Sidebar({ color, image, routes }) {
  const location = useLocation();
  const history = useHistory();
  const [openSubmenu, setOpenSubmenu] = useState(null);
  const [openSubmenuInbound, setOpenSubmenuInbound] = useState(null);
  const [openSubmenuOutbound, setOpenSubmenuOutbound] = useState(null);

  const activeRoute = (routeName) => {
    return location.pathname.indexOf(routeName) > -1 ? "active" : "";
  };

  const handleDropdownClick = (path) => {
    history.push(path);
  };

  const toggleSubmenu = (index) => {
    if (openSubmenu === index) {
      setOpenSubmenu(null);
    } else {
      setOpenSubmenu(index);
    }
  };

  const toggleSubmenuInbound = (index) => {
    if (openSubmenuInbound === index) {
      setOpenSubmenuInbound(null);
    } else {
      setOpenSubmenuInbound(index);
    }
  };

  const toggleSubmenuOutbound = (index) => {
    if (openSubmenuOutbound === index) {
      setOpenSubmenuOutbound(null);
    } else {
      setOpenSubmenuOutbound(index);
    }
  };

  return (
    <div className="sidebar" data-image={image} data-color={color}>
      <div
        className="sidebar-background"
        style={{
          backgroundImage: "url(" + image + ")",
        }}
      />
      <div className="sidebar-wrapper">
        <div className="logo d-flex align-items-center justify-content-start logo-app">
          <a href="" className="simple-text logo-mini mx-1">
            <div className="logo-img">
              <img src={require("assets/img/supply-chain.png")} alt="..." />
            </div>
          </a>

          <a className="simple-text" href="">
            supply chain management
          </a>
        </div>

        <Nav>
          {routes.map((category, key) => (
            <li
              className={`nav-item ${openSubmenu === key ? "open" : ""}`}
              key={key}
            >
              <Dropdown>
                <Dropdown.Toggle
                  className="nav-link"
                  onClick={() => toggleSubmenu(key)}
                >
                  <i className={`${category.icon} icon-margin`} />
                  <p className="category-menu">{category.category}</p>
                </Dropdown.Toggle>

                {category.routes && (
                  <div
                    className={`submenu ${openSubmenu === key ? "open" : ""}`}
                  >
                    {category.routes.map((route, key) => (
                      <Dropdown.Item
                        key={key}
                        onClick={() =>
                          handleDropdownClick(route.layout + route.path)
                        }
                        className={activeRoute(route.layout + route.path)}
                      >
                        {route.name}
                      </Dropdown.Item>
                    ))}
                  </div>
                )}

                {category.routesInbound && (
                  <div>
                    <Dropdown.Item
                      onClick={() => toggleSubmenuInbound(key)}
                      className={`nav-link ${
                        openSubmenuInbound === key ? "open" : ""
                      }`}
                    >
                      Inbound
                    </Dropdown.Item>
                    <div
                      className={`submenu-inbound ${
                        openSubmenuInbound === key ? "open" : ""
                      }`}
                    >
                      {category.routesInbound.map((route, key) => (
                        <Dropdown.Item
                          key={key}
                          onClick={() =>
                            handleDropdownClick(route.layout + route.path)
                          }
                          className={activeRoute(route.layout + route.path)}
                        >
                          {route.name}
                        </Dropdown.Item>
                      ))}
                    </div>
                  </div>
                )}

                {category.routesOutbound && (
                  <div>
                    <Dropdown.Item
                      onClick={() => toggleSubmenuOutbound(key)}
                      className={`nav-link ${
                        openSubmenuOutbound === key ? "open" : ""
                      }`}
                    >
                      Outbound
                    </Dropdown.Item>
                    <div
                      className={`submenu-outbound ${
                        openSubmenuOutbound === key ? "open" : ""
                      }`}
                    >
                      {category.routesOutbound.map((route, key) => (
                        <Dropdown.Item
                          key={key}
                          onClick={() =>
                            handleDropdownClick(route.layout + route.path)
                          }
                          className={activeRoute(route.layout + route.path)}
                        >
                          {route.name}
                        </Dropdown.Item>
                      ))}
                    </div>
                  </div>
                )}
              </Dropdown>
            </li>
          ))}
        </Nav>
      </div>
    </div>
  );
}

export default Sidebar;
