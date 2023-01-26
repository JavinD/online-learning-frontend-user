import React from "react";
import "./App.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import { Routes, Route } from "react-router-dom";
import DashboardPage from "./pages/Admin/DashboardPage";
import NotFoundPage from "./pages/NotFoundPage";
import AdminLoginPage from "./pages/Admin/LoginPage";
import UserLoginPage from "./pages/User/LoginPage";
import LayoutPage from "./pages/LayoutPage";
import HomePage from "./pages/HomePage";
import UnauthenticatedOnlyPage from "./pages/UnauthenticatedOnlyPage";
import RegisterPage from "./pages/User/RegisterPage";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/admin">
          <Route index element={<DashboardPage />} />
        </Route>
        <Route path="admin-login" element={<AdminLoginPage />} />

        <Route path="/" element={<LayoutPage />}>
          <Route element={<UnauthenticatedOnlyPage />}>
            <Route path="user-login" element={<UserLoginPage />} />
            <Route path="register" element={<RegisterPage />} />
          </Route>
          <Route path="/" element={<HomePage />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
}

export default App;
