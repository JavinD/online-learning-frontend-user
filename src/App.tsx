import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.scss";
import { Routes, Route } from "react-router-dom";
import DashboardPage from "./pages/Admin/DashboardPage";
import NotFoundPage from "./pages/NotFoundPage";
import AdminLoginPage from "./pages/Admin/LoginPage";
import UserLoginPage from "./pages/User/LoginPage";
import LayoutPage from "./pages/LayoutPage";
import HomePage from "./pages/HomePage";
import UnauthenticatedOnlyPage from "./pages/UnauthenticatedOnlyPage";
import RegisterPage from "./pages/User/RegisterPage";
import CoursePage from "./pages/User/CoursePage";
import AuthenticatedOnlyPage from "./pages/AuthenticatedOnlyPage";
import CourseDetailPage from "./pages/User/CourseDetailPage";
import { useCookies } from "react-cookie";
import ShoppingCart from "./pages/User/ShoppingCartPage";
import ProfilePage from "./pages/User/ProfilePage";

function App() {
  const [cookies] = useCookies(["token"]);

  console.log("cookies", cookies.token);
  return (
    <div className="App">
      <Routes>
        <Route path="/admin">
          <Route index element={<DashboardPage />} />
        </Route>
        <Route path="admin-login" element={<AdminLoginPage />} />

        <Route element={<LayoutPage />}>
          <Route element={<UnauthenticatedOnlyPage />}>
            <Route path="user-login" element={<UserLoginPage />} />
            <Route path="register" element={<RegisterPage />} />
          </Route>

          <Route element={<AuthenticatedOnlyPage />}>
            <Route path="/course/:slug" element={<CourseDetailPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/my-course" element={<HomePage />} />
            <Route path="/my-cart" element={<ShoppingCart />} />
          </Route>

          <Route path="/" element={<HomePage />} />
          <Route path="/course" element={<CoursePage />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
}

export default App;
