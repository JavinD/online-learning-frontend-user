import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Routes, Route } from "react-router-dom";
import DashboardPage from "./pages/Admin/DashboardPage";
import NotFoundPage from "./pages/NotFoundPage";
import LoginPage from "./pages/Admin/LoginPage";

function App() {
  return (
    <div className="App container">
      <Routes>
        <Route path="/admin">
          <Route index element={<DashboardPage />} />
        </Route>

        <Route path="login" element={<LoginPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
}

export default App;
