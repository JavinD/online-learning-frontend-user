import { ChangeEventHandler, FormEventHandler, useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import RegisterForm from "../../../components/forms/RegisterForm";
import ToastComponent from "../../../components/toast";
import { RegisterRequest } from "../../../interfaces";
import {
  isAlphaNumeric,
  isNumber,
  toastFailed,
  validateEmail,
} from "../../../utils/util";
import "./style.scss";

export default function RegisterPage() {
  const navigate = useNavigate();
  const API_URL = process.env.REACT_APP_API_URL;

  const [data, setData] = useState<RegisterRequest>({
    fullname: "",
    address: "",
    confirmPassword: "",
    email: "",
    password: "",
    phone_no: "",
    referrer: "",
    username: "",
  });
  const [errors, setError] = useState<RegisterRequest>({
    fullname: "",
    address: "",
    confirmPassword: "",
    email: "",
    password: "",
    phone_no: "",
    referrer: "",
    username: "",
  });
  const [cookies, setCookie] = useCookies(["token"]);

  const validateError = (name: string, value: string) => {
    let error = "";
    if (name === "fullname") {
      if (value === "") {
        error = "Full Name is required";
      }

      if (value.length < 5 || value.length > 20) {
        error = "Full name must be between 5 to 20 characters";
      }
      setError({
        ...errors,
        [name]: error,
      });
    }

    if (name === "username") {
      if (value === "") {
        error = "Username is required";
      }

      if (value.length < 5 || value.length > 15) {
        error = "Username must be between 5 to 15 characters";
      }

      if (!isAlphaNumeric(value)) {
        error = "Username must be alphanumeric";
      }

      setError({
        ...errors,
        [name]: error,
      });
    }

    if (name === "email") {
      if (value === "") {
        error = "Email is required";
      }

      if (!validateEmail(value)) {
        error = "Must be a valid email";
      }

      setError({
        ...errors,
        [name]: error,
      });
    }

    if (name === "password") {
      if (value === "") {
        error = "Password is required";
      }

      if (value.length < 8 || value.length > 20) {
        error = "Password must be between 8 to 20 characters";
      }
      setError({
        ...errors,
        [name]: error,
      });
    }

    if (name === "confirmPassword") {
      if (value === "") {
        error = "Password confirmation is required";
      }

      if (value.length < 8 || value.length > 20) {
        error = "Password confirmation must be between 8 to 20 characters";
      }

      if (value !== data.password) {
        error = "Password confirmation does not match";
      }
      setError({
        ...errors,
        [name]: error,
      });
    }

    if (name === "confirmPassword") {
      if (value === "") {
        error = "Password confirmation is required";
      }

      if (value.length < 8 || value.length > 20) {
        error = "Password confirmation must be between 8 to 20 characters";
      }

      if (value !== data.password) {
        error = "Password confirmation does not match";
      }
      setError({
        ...errors,
        [name]: error,
      });
    }

    if (name === "address") {
      if (value === "") {
        error = "Address confirmation is required";
      }

      if (value.length < 5 || value.length > 100) {
        error = "Address must be between 5 to 100 characters";
      }
      setError({
        ...errors,
        [name]: error,
      });
    }

    if (name === "phone_no") {
      if (value === "") {
        error = "Phone Number is required";
      }

      if (value.length < 10 || value.length > 15) {
        error = "Phone number must be between 9 to 15 digits";
      }

      if (!isNumber(value)) {
        error = "Phone number must be numeric";
      }

      setError({
        ...errors,
        [name]: error,
      });
    }
  };

  const onChange: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> = (
    e
  ) => {
    setData({ ...data, [e.target.name]: e.target.value });
    validateError(e.target.name, e.target.value);
  };

  const onSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    const convert = (data: RegisterRequest) => {
      const converted = { ...data } as Partial<RegisterRequest>;
      delete converted.confirmPassword;

      return converted;
    };

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(convert(data)),
    };

    fetch(API_URL + "/register", requestOptions)
      .then((response) => {
        if (!response.ok) {
          if (response.status === 404) {
            throw new Error("Error 404: Not Found");
          }
          throw new Error(response.statusText);
        }

        return response.json();
      })
      .then((res) => {
        if (res.access_token) {
          setCookie("token", res.access_token, { path: "/" });
        }

        navigate("/user-login");
      })
      .catch((error) => {
        toastFailed(error.message);
      });
  };

  return (
    <div className="row vh-100 gap-5">
      <ToastComponent />
      <div className="col-xl-5 d-flex flex-column justify-content-center login-hero">
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
      <div className="col-xl-5 d-flex justify-content-center align-items-center">
        <RegisterForm
          data={data}
          errors={errors}
          onChange={onChange}
          onSubmit={onSubmit}
        />
      </div>
    </div>
  );
}
