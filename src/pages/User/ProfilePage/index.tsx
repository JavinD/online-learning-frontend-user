import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useDispatch, useSelector } from "react-redux";
import { chooseBadgeByLevel } from "../../../assets/badges";
import TopBanner from "../../../components/heroes/TopBanner";
import GenericInput from "../../../components/inputs/GenericInput";
import GenericTextArea from "../../../components/inputs/GenericTextArea";
import { RootState } from "../../../store";
import {
  fetchUserDetails,
  UserDispatch,
} from "../../../store/slices/user/userSlice";
import "./styles.scss";

type Props = {};

export default function ProfilePage({}: Props) {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const { user } = useSelector((state: RootState) => state.user);
  const [cookies] = useCookies(["token"]);

  const userDispatch: UserDispatch = useDispatch();

  useEffect(() => {
    userDispatch(fetchUserDetails(cookies.token));
  }, [userDispatch, cookies.token]);

  return (
    <div>
      <TopBanner title="MY PROFILE" />
      <section style={{ backgroundColor: "#eee" }}>
        <div className="container py-5">
          <div className="row">
            <div className="col"></div>
          </div>
          <div className="row">
            <div className="col-lg-4">
              <div className="card mb-4">
                <div className="card-body text-center">
                  <div className="avatar">
                    {chooseBadgeByLevel(user?.level_id ? user.level_id : 0)}
                  </div>
                  <h5 className="my-3">{user?.fullname}</h5>
                  <p className="mb-1 level-text">{user?.level.name}</p>
                  <p className="text-muted mb-4">{user?.address}</p>
                </div>
              </div>
              <div className="card mb-4 mb-lg-0">
                <div className="card-body p-0">
                  <ul className="list-group list-group-flush rounded-3">
                    <li className="list-group-item d-flex justify-content-between align-items-center p-3">
                      <i className="fas fa-globe fa-lg text-warning" />
                      <p className="mb-0">https://mdbootstrap.com</p>
                    </li>
                    <li className="list-group-item d-flex justify-content-between align-items-center p-3">
                      <i
                        className="fab fa-github fa-lg"
                        style={{ color: "#333333" }}
                      />
                      <p className="mb-0">mdbootstrap</p>
                    </li>
                    <li className="list-group-item d-flex justify-content-between align-items-center p-3">
                      <i
                        className="fab fa-twitter fa-lg"
                        style={{ color: "#55acee" }}
                      />
                      <p className="mb-0">@mdbootstrap</p>
                    </li>
                    <li className="list-group-item d-flex justify-content-between align-items-center p-3">
                      <i
                        className="fab fa-instagram fa-lg"
                        style={{ color: "#ac2bac" }}
                      />
                      <p className="mb-0">mdbootstrap</p>
                    </li>
                    <li className="list-group-item d-flex justify-content-between align-items-center p-3">
                      <i
                        className="fab fa-facebook-f fa-lg"
                        style={{ color: "#3b5998" }}
                      />
                      <p className="mb-0">mdbootstrap</p>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-lg-8">
              <div className="card mb-4">
                <div className="card-body">
                  <div className="row">
                    <div className="col-sm-3 d-flex align-items-center">
                      <p className="mb-0">Full Name</p>
                    </div>
                    <div className="col-sm-9">
                      <GenericInput
                        error=""
                        formText=""
                        label=""
                        name=""
                        onChange={() => {}}
                        type="text"
                        required={true}
                        value={user?.fullname ? user.fullname : ""}
                      />
                    </div>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-sm-3">
                      <p className="mb-0">Username</p>
                    </div>
                    <div className="col-sm-9">
                      <p className="text-muted mb-0">
                        {" "}
                        <GenericInput
                          error=""
                          formText=""
                          label=""
                          name=""
                          onChange={() => {}}
                          type="text"
                          required={false}
                          value={user?.username ? user.username : ""}
                          disabled={true}
                        />
                      </p>
                    </div>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-sm-3">
                      <p className="mb-0">Email</p>
                    </div>
                    <div className="col-sm-9">
                      <p className="text-muted mb-0">
                        <GenericInput
                          error=""
                          formText=""
                          label=""
                          name=""
                          onChange={() => {}}
                          type="text"
                          required={false}
                          value={user?.email ? user.email : ""}
                          disabled={true}
                        />
                      </p>
                    </div>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-sm-3">
                      <p className="mb-0">Phone</p>
                    </div>
                    <div className="col-sm-9">
                      <p className="text-muted mb-0">
                        <GenericInput
                          error=""
                          formText=""
                          label=""
                          name=""
                          onChange={() => {}}
                          type="text"
                          required={true}
                          value={user?.phone_no ? user.phone_no : ""}
                        />
                      </p>
                    </div>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-sm-3 d-flex align-items-center">
                      <p className="mb-0">Address</p>
                    </div>
                    <div className="col-sm-9">
                      <p className="text-muted mb-0">
                        <GenericInput
                          error=""
                          formText=""
                          label=""
                          name=""
                          onChange={() => {}}
                          type="text"
                          required={true}
                          value={user?.address ? user.address : ""}
                          disabled={false}
                        />
                      </p>
                    </div>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-sm-3 d-flex align-items-center">
                      <p className="mb-0">Referral Code</p>
                    </div>
                    <div className="col-sm-9">
                      <p className="text-muted mb-0">
                        <GenericInput
                          error=""
                          formText=""
                          label=""
                          name=""
                          onChange={() => {}}
                          type="text"
                          required={false}
                          value={user?.referral_code ? user.referral_code : ""}
                          disabled={true}
                        />
                      </p>
                    </div>
                  </div>
                  <hr />
                </div>
              </div>
              <div className="row">
                <div className="col-md-6">
                  <div className="card mb-4 mb-md-0">
                    <div className="card-body">
                      <p className="mb-4">
                        <span className="text-primary font-italic me-1">
                          assigment
                        </span>{" "}
                        Project Status
                      </p>
                      <p className="mb-1" style={{ fontSize: ".77rem" }}>
                        Web Design
                      </p>
                      <div className="progress rounded" style={{ height: 5 }}>
                        <div
                          className="progress-bar"
                          role="progressbar"
                          style={{ width: "80%" }}
                          aria-valuenow={80}
                          aria-valuemin={0}
                          aria-valuemax={100}
                        />
                      </div>
                      <p className="mt-4 mb-1" style={{ fontSize: ".77rem" }}>
                        Website Markup
                      </p>
                      <div className="progress rounded" style={{ height: 5 }}>
                        <div
                          className="progress-bar"
                          role="progressbar"
                          style={{ width: "72%" }}
                          aria-valuenow={72}
                          aria-valuemin={0}
                          aria-valuemax={100}
                        />
                      </div>
                      <p className="mt-4 mb-1" style={{ fontSize: ".77rem" }}>
                        One Page
                      </p>
                      <div className="progress rounded" style={{ height: 5 }}>
                        <div
                          className="progress-bar"
                          role="progressbar"
                          style={{ width: "89%" }}
                          aria-valuenow={89}
                          aria-valuemin={0}
                          aria-valuemax={100}
                        />
                      </div>
                      <p className="mt-4 mb-1" style={{ fontSize: ".77rem" }}>
                        Mobile Template
                      </p>
                      <div className="progress rounded" style={{ height: 5 }}>
                        <div
                          className="progress-bar"
                          role="progressbar"
                          style={{ width: "55%" }}
                          aria-valuenow={55}
                          aria-valuemin={0}
                          aria-valuemax={100}
                        />
                      </div>
                      <p className="mt-4 mb-1" style={{ fontSize: ".77rem" }}>
                        Backend API
                      </p>
                      <div
                        className="progress rounded mb-2"
                        style={{ height: 5 }}
                      >
                        <div
                          className="progress-bar"
                          role="progressbar"
                          style={{ width: "66%" }}
                          aria-valuenow={66}
                          aria-valuemin={0}
                          aria-valuemax={100}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="card mb-4 mb-md-0">
                    <div className="card-body">
                      <p className="mb-4">
                        <span className="text-primary font-italic me-1">
                          assigment
                        </span>{" "}
                        Project Status
                      </p>
                      <p className="mb-1" style={{ fontSize: ".77rem" }}>
                        Web Design
                      </p>
                      <div className="progress rounded" style={{ height: 5 }}>
                        <div
                          className="progress-bar"
                          role="progressbar"
                          style={{ width: "80%" }}
                          aria-valuenow={80}
                          aria-valuemin={0}
                          aria-valuemax={100}
                        />
                      </div>
                      <p className="mt-4 mb-1" style={{ fontSize: ".77rem" }}>
                        Website Markup
                      </p>
                      <div className="progress rounded" style={{ height: 5 }}>
                        <div
                          className="progress-bar"
                          role="progressbar"
                          style={{ width: "72%" }}
                          aria-valuenow={72}
                          aria-valuemin={0}
                          aria-valuemax={100}
                        />
                      </div>
                      <p className="mt-4 mb-1" style={{ fontSize: ".77rem" }}>
                        One Page
                      </p>
                      <div className="progress rounded" style={{ height: 5 }}>
                        <div
                          className="progress-bar"
                          role="progressbar"
                          style={{ width: "89%" }}
                          aria-valuenow={89}
                          aria-valuemin={0}
                          aria-valuemax={100}
                        />
                      </div>
                      <p className="mt-4 mb-1" style={{ fontSize: ".77rem" }}>
                        Mobile Template
                      </p>
                      <div className="progress rounded" style={{ height: 5 }}>
                        <div
                          className="progress-bar"
                          role="progressbar"
                          style={{ width: "55%" }}
                          aria-valuenow={55}
                          aria-valuemin={0}
                          aria-valuemax={100}
                        />
                      </div>
                      <p className="mt-4 mb-1" style={{ fontSize: ".77rem" }}>
                        Backend API
                      </p>
                      <div
                        className="progress rounded mb-2"
                        style={{ height: 5 }}
                      >
                        <div
                          className="progress-bar"
                          role="progressbar"
                          style={{ width: "66%" }}
                          aria-valuenow={66}
                          aria-valuemin={0}
                          aria-valuemax={100}
                        />
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
