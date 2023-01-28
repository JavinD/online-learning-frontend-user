import React, { MouseEventHandler } from "react";
import { Navigate, NavLink, useNavigate } from "react-router-dom";
import "./style.scss";
import { useCookies } from "react-cookie";

export default function NavBar() {
  const [cookies, removeCookie] = useCookies(["token"]);
  const navigate = useNavigate();

  const logOut: MouseEventHandler<HTMLAnchorElement> = (e) => {
    e.preventDefault();
    if (window.confirm("Are you sure you want to log out?")) {
      removeCookie("token", { path: "/" });
      navigate("/user-login");
    } else {
    }
  };

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
              <NavLink className="nav-link ms-lg-5" to="/course">
                Courses
              </NavLink>
              <NavLink className="nav-link ms-lg-5" to="/my-course">
                My Course
              </NavLink>
              <NavLink className="nav-link ms-lg-5" to="/profile">
                My Profile
              </NavLink>

              <NavLink
                onClick={logOut}
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
