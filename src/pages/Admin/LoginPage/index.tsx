import React from "react";
import LoginForm from "../../../components/forms/LoginForm";
import "./style.scss";

export default function LoginPage() {
  const data = {
    identifier: "admin",
    password: "admin",
  };

  return (
    <div className="row vh-100">
      {/* <div className="col-md-6 d-flex align-items-center justify-content-center">
        <div className="login-hero">
          <div className="login-hero-box">
            <div className="login-hero-text">
              <h2 className="login-hero-heading">
                Digital platform for online{" "}
                <strong className="primary-text">learning.</strong>
              </h2>
              <h3 className="login-hero-subheading">asdadsasdas</h3>
            </div>
          </div>
        </div>
      </div>
      <div className="col-md-6 d-flex justify-content-center align-items-center">
        <LoginForm data={data} />
      </div> */}
    </div>
  );
}
