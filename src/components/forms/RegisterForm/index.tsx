import React, { ChangeEventHandler, FormEventHandler } from "react";
import { NavLink } from "react-router-dom";
import { RegisterRequest } from "../../../interfaces";
import AuthButton from "../../buttons/AuthButton";
import GenericInput from "../../inputs/GenericInput";
import GenericTextArea from "../../inputs/GenericTextArea";
import "./style.scss";

type Props = {
  data: RegisterRequest;
  onChange: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  onSubmit: FormEventHandler<HTMLFormElement>;
  errors: RegisterRequest;
};

export default function RegisterForm({
  data,
  onChange,
  onSubmit,
  errors,
}: Props) {
  let isError = false;
  Object.keys(errors).forEach((key) => {
    let errorMessage = errors[key as keyof RegisterRequest];
    if (errorMessage !== "") {
      isError = true;
    }
  });

  return (
    <div>
      <div className="form-container">
        <div className="form-login-text">
          <h2 className="login-greeting login-row">
            Create a free acount now! 🔰
          </h2>
          <h3 className="login-subgreeting">
            Enter your information to register.
          </h3>
        </div>

        <form onSubmit={onSubmit}>
          <div className="row gap-4">
            <div className="col-auto mb-2 auth-form-section">
              <GenericInput
                label="Full Name"
                type="text"
                value={data.fullname}
                formText=""
                onChange={onChange}
                name="fullname"
                error={errors.fullname}
                required={true}
              />
            </div>
            <div className="col-auto mb-2 auth-form-section">
              <GenericInput
                label="Username"
                type="text"
                value={data.username}
                formText=""
                onChange={onChange}
                name="username"
                error={errors.username}
                required={true}
              />
            </div>
          </div>

          <div className="mb-2 auth-form-section">
            <GenericInput
              label="Email"
              type="email"
              value={data.email}
              formText=""
              onChange={onChange}
              name="email"
              error={errors.email}
              required={true}
            />
          </div>
          <div className="row gap-4">
            <div className="col-auto mb-2 auth-form-section">
              <GenericInput
                label="Password"
                type="password"
                value={data.password}
                formText=""
                onChange={onChange}
                name="password"
                error={errors.password}
                required={true}
              />
            </div>
            <div className="col-auto mb-2 auth-form-section">
              <GenericInput
                label="Confirm Password"
                type="password"
                value={data.confirmPassword}
                formText=""
                onChange={onChange}
                name="confirmPassword"
                error={errors.confirmPassword}
                required={true}
              />
            </div>
          </div>
          <div className="mb-2 auth-form-section">
            <GenericTextArea
              label="Home Address"
              value={data.address}
              formText=""
              onChange={onChange}
              name="address"
              error={errors.address}
              required={true}
            />
          </div>
          <div className="mb-2 auth-form-section">
            <GenericInput
              label="Phone Number"
              type="text"
              value={data.phone_no}
              formText=""
              onChange={onChange}
              name="phone_no"
              error={errors.phone_no}
              required={true}
            />
          </div>

          <div className="mb-2 auth-form-section">
            <GenericInput
              label="Referral Code (Optional)"
              type="text"
              value={data.referrer}
              formText=""
              onChange={onChange}
              name="referrer"
              error={errors.referrer}
              required={false}
            />
          </div>
          <h4 className="form-note">
            Already have an account? <NavLink to="/user-login">Login</NavLink>{" "}
          </h4>
          <AuthButton
            classNames="login-btn"
            label="Register"
            isError={isError}
          />
        </form>
      </div>
    </div>
  );
}
