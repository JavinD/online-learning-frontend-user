import React from "react";
import { NavLink } from "react-router-dom";
import "./style.scss";

export default function NotFoundPage() {
  return (
    <div className="row vh-100 d-flex page-container align-items-center">
      <div className="col">
        <h2 className="heading">404 NOT FOUND</h2>
        <NavLink className="subheading" to={"/"}>
          Go Home
        </NavLink>
      </div>
    </div>
  );
}
