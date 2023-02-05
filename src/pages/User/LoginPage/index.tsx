import { ChangeEventHandler, FormEventHandler, useState } from "react";
import { useCookies } from "react-cookie";
import { useLocation, useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import LoginForm from "../../../components/forms/LoginForm";
import ToastComponent from "../../../components/toast";
import { LoginRequest } from "../../../interfaces";
import { toastFailed } from "../../../utils/util";
import "./styles.scss";

export default function LoginPage() {
  const navigate = useNavigate();

  const [data, setData] = useState<LoginRequest>({
    identifier: "",
    password: "",
  });
  const [errors, setError] = useState<LoginRequest>({
    identifier: "",
    password: "",
  });
  const [cookies, setCookie] = useCookies(["access_token"]);
  const API_URL = process.env.REACT_APP_API_URL;
  const location = useLocation();

  const validateError = (name: string, value: string) => {
    let error = "";
    if (name === "identifier") {
      if (value === "") {
        error = "Email, username or phone number is required";
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

      if (value.length <= 8 || value.length >= 20) {
        error = "Password is must be between 8 to 20 characters";
      }
      setError({
        ...errors,
        [name]: error,
      });
    }
  };

  const onChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
    validateError(e.target.name, e.target.value);
  };

  const onSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    };

    fetch(API_URL + "/user-login", requestOptions)
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
          setCookie("access_token", res.access_token, { path: "/" });
        }

        navigate("/", { replace: true, state: { from: location } });
      })
      .catch((error) => {
        toastFailed("Invalid email, username or password");
      });
  };

  return (
    <div className="row">
      <ToastComponent />
      <section className="h-100 gradient-form">
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-xl-10">
              <div className="card rounded-3 text-black">
                <div className="row g-0">
                  <div className="col-lg-6">
                    <LoginForm
                      data={data}
                      errors={errors}
                      onChange={onChange}
                      onSubmit={onSubmit}
                    />
                  </div>
                  <div className="col-lg-6 d-flex align-items-center gradient-custom-2">
                    <div className="text-white px-3 py-4 p-md-5 mx-md-4">
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
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
