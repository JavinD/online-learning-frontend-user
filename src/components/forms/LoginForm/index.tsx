import React, { ChangeEventHandler, FormEventHandler } from "react";
import { NavLink } from "react-router-dom";
import { LoginRequest } from "../../../interfaces";
import AuthButton from "../../buttons/AuthButton";
import GenericInput from "../../inputs/GenericInput";
import "./style.scss";

type Props = {
  data: LoginRequest;
  onChange: ChangeEventHandler<HTMLInputElement>;
  onSubmit: FormEventHandler<HTMLFormElement>;
  error: LoginRequest;
};

export default function LoginForm({ data, onChange, onSubmit, error }: Props) {
  return (
    <div>
      <div className="form-container">
        <div className="form-login-text">
          <h2 className="login-greeting login-row">Hi! 👋</h2>
          <h3 className="login-subgreeting">
            Enter your information to login.
          </h3>
        </div>

        <form onSubmit={onSubmit}>
          <div className="mb-3 auth-form-section">
            <GenericInput
              label="Email/Phone/Username"
              type="text"
              value={data.identifier}
              formText="We'll never share your information with anyone else."
              onChange={onChange}
              name="identifier"
            />
          </div>
          <div className="mb-3 auth-form-section">
            <GenericInput
              label="Password"
              type="password"
              value={data.password}
              formText=""
              onChange={onChange}
              name="password"
            />
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
