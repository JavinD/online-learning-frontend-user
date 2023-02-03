import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.scss";
import { Routes, Route } from "react-router-dom";
import NotFoundPage from "./pages/NotFoundPage";
import UserLoginPage from "./pages/User/LoginPage";
import LayoutPage from "./pages/LayoutPage";
import HomePage from "./pages/HomePage";
import UnauthenticatedOnlyPage from "./pages/UnauthenticatedOnlyPage";
import RegisterPage from "./pages/User/RegisterPage";
import CoursePage from "./pages/User/CoursePage";
import AuthenticatedOnlyPage from "./pages/AuthenticatedOnlyPage";
import CourseDetailPage from "./pages/User/CourseDetailPage";
import ShoppingCart from "./pages/User/ShoppingCartPage";
import ProfilePage from "./pages/User/ProfilePage";
import InvoicePage from "./pages/User/InvoicePage";
import InvoiceDetailPage from "./pages/User/InvoiceDetailPage";
import InvoicePayPage from "./pages/User/InvoicePayPage";
import MyFavoritePage from "./pages/User/MyFavoritePage";
import MyCoursePage from "./pages/User/MyCoursePage";
import MyRewardPage from "./pages/User/MyRewardPage";
import "bootstrap/dist/js/bootstrap.bundle.min";
function App() {
  return (
    <div className="App">
      <Routes>
        <Route element={<LayoutPage />}>
          <Route element={<UnauthenticatedOnlyPage />}>
            <Route path="user-login" element={<UserLoginPage />} />
            <Route path="register" element={<RegisterPage />} />
          </Route>

          <Route element={<AuthenticatedOnlyPage />}>
            <Route path="/course/:slug" element={<CourseDetailPage />} />
            <Route path="/user">
              <Route index element={<ProfilePage />} />
              <Route path="profile" element={<ProfilePage />} />
              <Route path="course" element={<MyCoursePage />} />
              <Route path="favorite" element={<MyFavoritePage />} />
              <Route path="cart" element={<ShoppingCart />} />
              <Route path="reward" element={<MyRewardPage />} />
              <Route path="invoice">
                <Route index element={<InvoicePage />} />
                <Route path=":id" element={<InvoiceDetailPage />} />
                <Route path=":id/pay" element={<InvoicePayPage />} />
              </Route>
            </Route>
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
