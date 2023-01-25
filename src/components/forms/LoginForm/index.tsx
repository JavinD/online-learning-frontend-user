import React from "react";
import { NavLink } from "react-router-dom";
import AuthButton from "../../buttons/AuthButton";
import GenericInput from "../../inputs/GenericInput";
import "./style.scss";

export default function LoginForm() {
  return (
    <div>
      <div className="form-container">
        <div className="form-login-text">
          <h2 className="login-greeting login-row">Hi! 👋</h2>
          <h3 className="login-subgreeting">
            Enter your information to login.
          </h3>
        </div>

        <form>
          <div className="mb-3 auth-form-section">
            <GenericInput
              label="Email/Phone/Username"
              type="text"
              formText="We'll never share your information with anyone else."
            />
          </div>
          <div className="mb-3 auth-form-section">
            <GenericInput label="Password" type="password" formText="" />
          </div>
          <h4 className="form-note">
            New to DigiEdu? <NavLink to="/register">Register</NavLink>{" "}
          </h4>
          <AuthButton classNames="login-btn" label="Login" />
        </form>
      </div>
    </div>
  );
}
