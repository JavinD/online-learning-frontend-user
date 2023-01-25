import React, { ChangeEventHandler, FormEventHandler, useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import LoginForm from "../../../components/forms/LoginForm";
import { LoginRequest } from "../../../interfaces";
import "react-toastify/dist/ReactToastify.css";
import "./style.scss";

export default function LoginPage() {
  const navigate = useNavigate();

  const [data, setData] = useState<LoginRequest>({
    identifier: "",
    password: "",
  });
  const [error, setError] = useState<LoginRequest>({
    identifier: "",
    password: "",
  });
  const [cookies, setCookie] = useCookies(["token"]);

  const onChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });

    if (e.target.value === "") {
      setError({ ...error, [e.target.name]: e.target.name + " is required" });
    }
  };

  const onSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    };

    fetch(process.env.REACT_APP_API + "/user-login", requestOptions)
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

        navigate("/");
      })
      .catch((error) => {
        toast.error("Wrong identifier or password", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      });
  };

  return (
    <div className="row vh-100">
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <div className="col-md-6 d-flex flex-column justify-content-center login-hero">
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
      <div className="col-md-6 d-flex justify-content-center align-items-center">
        <LoginForm
          data={data}
          error={error}
          onChange={onChange}
          onSubmit={onSubmit}
        />
      </div>
    </div>
  );
}
