import React from "react";
import { NavLink } from "react-router-dom";
import "./style.scss";
import { useCookies } from "react-cookie";

export default function NavBar() {
  const [cookies, removeCookie] = useCookies(["token"]);

  return (
    <div>
      <nav className="navbar navbar-auth navbar-expand-lg fixed-top">
        <div className="container">
          <NavLink to="" className="navbar-brand brand-text">
            DigiEdu
          </NavLink>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavAltMarkup"
            aria-controls="navbarNavAltMarkup"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className="collapse navbar-collapse justify-content-end"
            id="navbarNavAltMarkup"
          >
            <div className="navbar-nav">
              <NavLink className="nav-link ms-lg-5" aria-current="page" to="">
                Home
              </NavLink>
              <NavLink className="nav-link ms-lg-5" to="/transfer">
                Transfer
              </NavLink>
              <NavLink className="nav-link ms-lg-5" to="/topup">
                Topup
              </NavLink>
              <NavLink className="nav-link ms-lg-5" to="/games">
                Games
              </NavLink>
              <NavLink
                onClick={() => {
                  removeCookie("token", { path: "/" });
                }}
                className="nav-link ms-lg-5"
                to="/user-login"
              >
                Logout
              </NavLink>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}
