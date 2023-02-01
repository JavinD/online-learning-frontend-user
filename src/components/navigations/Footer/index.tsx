import React from "react";
import {
  Facebook,
  Instagram,
  Linkedin,
  Twitter,
  GitHub,
  Home,
  Mail,
  Phone,
  Printer,
} from "react-feather";
import { Link } from "react-router-dom";
import "./styles.scss";

export default function Footer() {
  return (
    <div className="footer-container">
      <footer
        className="text-center text-lg-start text-white"
        style={{ backgroundColor: "#f06001" }}
      >
        {/* Section: Social media */}
        <section
          className="d-flex justify-content-between p-4"
          style={{ backgroundColor: "#2ca396" }}
        >
          {/* Left */}
          <div className="me-5">
            <span>Get connected with us on social networks:</span>
          </div>
          {/* Left */}
          {/* Right */}
          <div>
            <span className="text-white me-4">
              <i>
                <Facebook />
              </i>
            </span>
            <span className="text-white me-4">
              <i>
                <Twitter />
              </i>
            </span>
            <span className="text-white me-4">
              <i>
                <Instagram />
              </i>
            </span>
            <span className="text-white me-4">
              <i>
                <Linkedin />{" "}
              </i>
            </span>
            <span className="text-white me-4">
              <i>
                <GitHub />
              </i>
            </span>
          </div>
          {/* Right */}
        </section>
        {/* Section: Social media */}
        {/* Section: Links  */}
        <section className="">
          <div className="container text-center text-md-start mt-5">
            {/* Grid row */}
            <div className="row mt-3">
              {/* Grid column */}
              <div className="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
                {/* Content */}
                <h6 className="fw-bold brand-text">DigiEdu</h6>
                <hr
                  className="mb-4 mt-0 d-inline-block mx-auto"
                  style={{
                    width: 60,
                    backgroundColor: "#7c4dff",
                    height: 2,
                  }}
                />
                <p>Empowering lifelong learners through digital education.</p>
              </div>
              {/* Grid column */}
              {/* Grid column */}
              <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4">
                {/* Links */}
                <h6 className="text-uppercase fw-bold">Products</h6>
                <hr
                  className="mb-4 mt-0 d-inline-block mx-auto"
                  style={{
                    width: 60,
                    backgroundColor: "#7c4dff",
                    height: 2,
                  }}
                />
                <p>
                  <Link to="course" className="text-white">
                    Courses
                  </Link>
                </p>
                <p>
                  <Link to="" className="text-white">
                    Books
                  </Link>
                </p>
                <p>
                  <Link to="" className="text-white">
                    Classes
                  </Link>
                </p>
                <p>
                  <Link to="" className="text-white">
                    Campus
                  </Link>
                </p>
              </div>
              {/* Grid column */}
              {/* Grid column */}
              <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4">
                {/* Links */}
                <h6 className="text-uppercase fw-bold">Useful links</h6>
                <hr
                  className="mb-4 mt-0 d-inline-block mx-auto"
                  style={{
                    width: 60,
                    backgroundColor: "#7c4dff",
                    height: 2,
                  }}
                />
                <p>
                  <Link to="user/profile" className="text-white">
                    Your Account
                  </Link>
                </p>
                <p>
                  <Link to="user/reward" className="text-white">
                    Your Rewards
                  </Link>
                </p>
                <p>
                  <Link to="user/invoice" className="text-white">
                    Your Invoices
                  </Link>
                </p>
                <p>
                  <Link to="user/course" className="text-white">
                    Your Favorites
                  </Link>
                </p>
              </div>
              {/* Grid column */}
              {/* Grid column */}
              <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
                {/* Links */}
                <h6 className="text-uppercase fw-bold">Contact Us</h6>
                <hr
                  className="mb-4 mt-0 d-inline-block mx-auto"
                  style={{
                    width: 60,
                    backgroundColor: "#7c4dff",
                    height: 2,
                  }}
                />
                <p>
                  <i className="me-3">
                    <Home />
                  </i>{" "}
                  Sopo Del Tower, Jakarta Selatan, 12950
                </p>
                <p>
                  <i className="me-3">
                    <Mail />
                  </i>{" "}
                  digiedu@mail.com
                </p>
                <p>
                  <i className="me-3">
                    <Phone />
                  </i>{" "}
                  +62 01 234 567 88
                </p>
                <p>
                  <i className="me-3">
                    <Printer />{" "}
                  </i>
                  +62 01 234 567 89
                </p>
              </div>
              {/* Grid column */}
            </div>
            {/* Grid row */}
          </div>
        </section>
        {/* Section: Links  */}
        {/* Copyright */}
        <div
          className="text-center p-3"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}
        >
          © 2022 Copyright:
          <span className="text-white"> DigiEdu.com</span>
        </div>
        {/* Copyright */}
      </footer>
    </div>
  );
}
