import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import {
  Copy,
  Facebook,
  Instagram,
  Link,
  Twitter,
  Youtube,
} from "react-feather";
import { useDispatch, useSelector } from "react-redux";
import { chooseBadgeByLevel } from "../../../assets/badges";
import GenericButton from "../../../components/buttons/GenericButton";
import TopBanner from "../../../components/heroes/TopBanner";
import GenericInput from "../../../components/inputs/GenericInput";
import ToastComponent from "../../../components/toast";
import { RootState } from "../../../store";
import {
  fetchUserDetails,
  UserDispatch,
} from "../../../store/slices/user/userSlice";
import { isNumber, toastFailed, toastSuccess } from "../../../utils/util";
import "./styles.scss";

export default function ProfilePage() {
  const API_URL_USER = process.env.REACT_APP_API_URL_AUTH_USER;
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const { user } = useSelector((state: RootState) => state.user);
  const [cookies] = useCookies(["token"]);
  const userDispatch: UserDispatch = useDispatch();

  const [updateUser, setUpdateUser] = useState({
    fullname: "",
    phone_no: "",
    address: "",
  });

  const [errors, setErrors] = useState({
    fullname: "",
    phone_no: "",
    address: "",
  });

  const validateError = (name: string, value: string) => {
    let error = "";
    if (name === "fullname") {
      if (value === "") {
        error = "Full Name is required";
      }

      if (value.length < 5 || value.length > 20) {
        error = "Full name must be between 5 to 20 characters";
      }
      setErrors({
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

      setErrors({
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
      setErrors({
        ...errors,
        [name]: error,
      });
    }
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUpdateUser({ ...updateUser, fullname: e.target.value });
    validateError(e.target.name, e.target.value);
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUpdateUser({ ...updateUser, phone_no: e.target.value });
    validateError(e.target.name, e.target.value);
  };

  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUpdateUser({ ...updateUser, address: e.target.value });
    validateError(e.target.name, e.target.value);
  };

  useEffect(() => {
    userDispatch(fetchUserDetails(cookies.token));
  }, [userDispatch, cookies.token]);

  useEffect(() => {
    setUpdateUser({
      fullname: user?.fullname ? user.fullname : "",
      phone_no: user?.phone_no ? user.phone_no : "",
      address: user?.address ? user.address : "",
    });
  }, [user?.address, user?.fullname, user?.phone_no]);

  const handleEdit: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    setIsEditing(true);
  };

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    if (
      updateUser.fullname === user?.fullname &&
      updateUser.phone_no === user?.phone_no &&
      updateUser.address === user?.address
    ) {
      setIsEditing(false);
      return;
    }

    const requestOptions = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${cookies.token}`,
      },
      body: JSON.stringify({
        fullname: updateUser.fullname,
        phone_no: updateUser.phone_no,
        address: updateUser.address,
      }),
    };

    fetch(API_URL_USER + "", requestOptions)
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
        userDispatch(fetchUserDetails(cookies.token));
        setIsEditing(false);
        toastSuccess("Profile updated successfully");
      })
      .catch((error) => {
        toastFailed("Failed to update profile");
      });
  };

  return (
    <div>
      <ToastComponent />
      <TopBanner title="MY PROFILE" />
      <section
        className="profile-container"
        style={{ backgroundColor: "#eee" }}
      >
        <div className="container py-5">
          <div className="row gap-1 justify-content-center">
            <div className="col-lg-8">
              <div className="card mb-4">
                <div className="profile-header card-body text-center">
                  <div className="avatar">
                    {chooseBadgeByLevel(user?.level_id ? user.level_id : 0)}
                  </div>
                  <h5 className="my-3 profile-name">
                    My name is {user?.fullname}
                  </h5>
                  <p className="mb-1 level-text profile-level">
                    LEVEL - {user?.level.name}
                  </p>
                  <p className="text-muted mb-4 profile-address">
                    I live at {user?.address}
                  </p>
                </div>
              </div>
            </div>
            <div className="col-lg-8">
              <div className="card mb-4">
                <form onSubmit={handleSubmit}>
                  <div className="card-body">
                    <div className="row">
                      <div className="col-sm-3 d-flex align-items-center">
                        <p className="mb-0">Full Name</p>
                      </div>

                      <div className="col-sm-9">
                        <GenericInput
                          error={errors.fullname}
                          formText=""
                          label=""
                          name="fullname"
                          onChange={handleNameChange}
                          type="text"
                          required={true}
                          disabled={!isEditing}
                          value={updateUser.fullname}
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
                            error={errors.phone_no}
                            formText=""
                            label=""
                            name="phone_no"
                            onChange={handlePhoneChange}
                            type="text"
                            required={true}
                            disabled={!isEditing}
                            value={updateUser.phone_no}
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
                            error={errors.address}
                            formText=""
                            label=""
                            name="address"
                            onChange={handleAddressChange}
                            type="text"
                            required={true}
                            value={updateUser.address}
                            disabled={!isEditing}
                          />
                        </p>
                      </div>
                    </div>

                    <div className="right">
                      {!isEditing ? (
                        <GenericButton
                          onClick={handleEdit}
                          label="Edit Profile"
                        />
                      ) : (
                        <GenericButton type="submit" label="Save" />
                      )}
                    </div>
                  </div>
                </form>
              </div>

              <div className="row">
                <div className="col-md-12">
                  <div className="card mb-4 mb-md-0">
                    <div className="card-body">
                      {/* Share Refferal Code */}
                      <div className="card-body-title referral-code-title">
                        <h5 className="card-title">Share your Refferal Code</h5>
                      </div>
                      <div className="card-body-text referral-code-text">
                        <p className="card-text">
                          Share your refferal code to your friends and family
                          and get exclusive rewards!
                        </p>
                      </div>
                      <div
                        className="referral-code"
                        onClick={() => {
                          navigator.clipboard.writeText(
                            user?.referral_code ? user.referral_code : ""
                          );
                          toastSuccess("Copied to clipboard");
                        }}
                      >
                        <p className="card-text">
                          <Copy size={50} />
                          {user?.referral_code}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-12">
                  <div className="card mb-4 mb-md-0"></div>
                </div>
                <div className="card mb-4 mt-lg-4 mb-lg-0">
                  <div className="card-body p-0">
                    <ul className="list-group list-group-flush rounded-3">
                      <li className="list-group-item d-flex justify-content-between align-items-center p-3">
                        <i>
                          <Link color="#555555" />
                        </i>

                        <p className="mb-0">https://acong.com</p>
                      </li>
                      <li className="list-group-item d-flex justify-content-between align-items-center p-3">
                        <i>
                          <Youtube color="#FF0000" />
                        </i>
                        <p className="mb-0">Acong</p>
                      </li>
                      <li className="list-group-item d-flex justify-content-between align-items-center p-3">
                        <i>
                          <Twitter color="#1DA1F2" />
                        </i>
                        <p className="mb-0">@acong</p>
                      </li>
                      <li className="list-group-item d-flex justify-content-between align-items-center p-3">
                        <i>
                          <Instagram />
                        </i>
                        <p className="mb-0">acong</p>
                      </li>
                      <li className="list-group-item d-flex justify-content-between align-items-center p-3">
                        <i>
                          <Facebook color="#4267B2" />
                        </i>
                        <p className="mb-0">Acong</p>
                      </li>
                    </ul>
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
