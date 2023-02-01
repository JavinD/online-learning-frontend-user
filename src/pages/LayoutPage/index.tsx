import React from "react";

import { Outlet } from "react-router-dom";
import { useCookies } from "react-cookie";
import { decodeToken, isExpired } from "react-jwt";
import NavBarUnauthenticated from "../../components/navigations/NavBarUnauthenticated";
import NavBarAuthenticated from "../../components/navigations/NavBarAuthenticated";
import Footer from "../../components/navigations/Footer";

export default function LayoutPage() {
  const [cookies] = useCookies(["token"]);
  const decodedToken = decodeToken(cookies.token);
  const isMyTokenExpired = isExpired(cookies.token);

  if (decodedToken === null || isMyTokenExpired === true) {
    return (
      <div>
        <NavBarUnauthenticated />
        <Outlet />
      </div>
    );
  }

  return (
    <div>
      <NavBarAuthenticated />
      <Outlet />
      <Footer />
    </div>
  );
}
