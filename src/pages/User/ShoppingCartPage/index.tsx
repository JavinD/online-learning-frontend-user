import React, { useEffect } from "react";
import { useCookies } from "react-cookie";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import LottieComponent from "../../../components/animations/Lottie";
import GenericButton from "../../../components/buttons/GenericButton";
import CartItemCard from "../../../components/cart/CartItemCard";
import GenericInput from "../../../components/inputs/GenericInput";
import ToastComponent from "../../../components/toast";
import { RootState } from "../../../store";
import { CartDispatch, fetchCart } from "../../../store/slices/cart/cartSlice";
import {
  fetchUserDetails,
  UserDispatch,
} from "../../../store/slices/user/userSlice";
import {
  countCartTotal,
  countTotalPrice,
  toastFailed,
  toastSuccess,
  toRupiah,
} from "../../../utils/util";
import "./styles.scss";
import emptyBox from "../../../assets/empty-box.json";

export default function ShoppingCart() {
  const API_URL = process.env.REACT_APP_API_URL_AUTH_USER;
  const navigate = useNavigate();

  const { cart } = useSelector((state: RootState) => state.cart);
  const { user } = useSelector((state: RootState) => state.user);
  const [cookies] = useCookies(["token"]);
  const [isVoucherUsed, setIsVoucherUsed] = React.useState(false);
  const [voucher, setVoucher] = React.useState("");
  const [total, setTotal] = React.useState(0);
  const [discount, setDiscount] = React.useState(0);
  const [userLevel, setUserLevel] = React.useState("newbie");

  const cartDispatch: CartDispatch = useDispatch();
  const userDispatch: UserDispatch = useDispatch();

  const handleVoucherChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVoucher(e.target.value);
  };

  useEffect(() => {
    userDispatch(fetchUserDetails(cookies.token));
  }, [userDispatch, cookies.token]);

  useEffect(() => {
    cartDispatch(fetchCart(cookies.token));
  }, [cartDispatch, cookies.token]);

  useEffect(() => {
    setTotal(countCartTotal(cart));
    if (user?.level) {
      setUserLevel(user?.level.name);
      setDiscount(user?.level.discount_percent);
    }
  }, [cart, user, total]);

  const handleRemoveItem = (courseId: string) => {
    const requestOptions = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + cookies.token,
      },
    };

    fetch(API_URL + "/cart/" + courseId, requestOptions)
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
        toastSuccess("Item removed from cart");
        cartDispatch(fetchCart(cookies.token));
        return;
      })
      .catch((error) => {
        toastFailed("Failed to process your request");
      });
  };

  const handleCheckout: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + cookies.token,
      },
      body: JSON.stringify({ voucher_code: "" }),
    };

    if (voucher !== "") {
      requestOptions.body = JSON.stringify({ voucher_code: voucher });
    }

    fetch(API_URL + "/invoice", requestOptions)
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
        toastSuccess("Checkout success");
        navigate("/user/invoice/");
      })
      .catch((error) => {
        toastFailed("Failed to process your request");
      });
  };

  return (
    <div>
      <ToastComponent />
      <section className="h-100 h-custom cart-container">
        <div className="container h-100 py-5">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col">
              <div className="card shopping-cart" style={{ borderRadius: 15 }}>
                <div className="card-body text-black">
                  <div className="row">
                    {!cart || cart.length === 0 ? (
                      <div className="col-lg-6 px-5 py-4">
                        <h3 className="pt-2 text-center fw-bold text-uppercase ">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="60"
                            height="60"
                            fill="currentColor"
                            className="bi bi-cart"
                            viewBox="0 0 16 16"
                          >
                            <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l1.313 7h8.17l1.313-7H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />{" "}
                          </svg>
                          Shopping Cart
                        </h3>
                        <LottieComponent animationData={emptyBox} />
                        {/* No item in cart */}
                        <h3 className="pt-2 text-center fw-bold text-uppercase ">
                          No item in cart
                        </h3>
                      </div>
                    ) : (
                      <div className="col-lg-6 px-5 py-4">
                        (
                        <h3 className="mb-5 pt-2 text-center fw-bold text-uppercase ">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="60"
                            height="60"
                            fill="currentColor"
                            className="bi bi-cart"
                            viewBox="0 0 16 16"
                          >
                            <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l1.313 7h8.17l1.313-7H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />{" "}
                          </svg>
                          Shopping Cart
                        </h3>
                        {cart && cart.length > 0
                          ? cart.map((item) => {
                              return (
                                <CartItemCard
                                  handleRemoveItem={handleRemoveItem}
                                  key={item.course.slug}
                                  cartItem={item}
                                />
                              );
                            })
                          : []}
                        <hr
                          className="mb-4"
                          style={{
                            height: 2,
                            backgroundColor: "#1266f1",
                            opacity: 1,
                          }}
                        />
                        <div className="d-flex justify-content-between px-x align-items-center">
                          <p className="fw-bold">
                            Membership Discount{" "}
                            <span className={"level " + user?.level.name}>
                              {userLevel} ({discount * 100}%)
                            </span>
                            :
                          </p>
                          <p className="fw-bold">
                            - {toRupiah(discount * total)}
                          </p>
                        </div>
                        <div className="d-flex justify-content-between p-2 mb-2 total">
                          <h5 className="fw-bold mb-0">Total:</h5>
                          <h5 className="fw-bold mb-0">
                            {toRupiah(countTotalPrice(total, discount, 0))}
                          </h5>
                        </div>
                      </div>
                    )}

                    <div className="col-lg-6 px-5 py-4">
                      <h3 className="mb-5 pt-2 text-center fw-bold text-uppercase">
                        <svg
                          width={60}
                          height={60}
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                        >
                          {" "}
                          <g>
                            {" "}
                            <path fill="none" d="M0 0h24v24H0z" />{" "}
                            <path d="M2 9.5V4a1 1 0 0 1 1-1h18a1 1 0 0 1 1 1v5.5a2.5 2.5 0 1 0 0 5V20a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1v-5.5a2.5 2.5 0 1 0 0-5zM14 5H4v2.968a4.5 4.5 0 0 1 0 8.064V19h10V5zm2 0v14h4v-2.968a4.5 4.5 0 0 1 0-8.064V5h-4z" />{" "}
                          </g>{" "}
                        </svg>
                        Voucher{" "}
                        <span className="text-lowercase fw-light">
                          (Optional)
                        </span>
                      </h3>

                      <form className="mb-5" onSubmit={handleCheckout}>
                        <GenericInput
                          error=""
                          formText=""
                          label="Voucher Code: "
                          name="voucher"
                          onChange={handleVoucherChange}
                          required={false}
                          type="text"
                          value={voucher}
                          className="cart-form-control"
                        />
                        <GenericButton
                          disabled={!cart || cart.length === 0 ? true : false}
                          type="submit"
                          label="Checkout"
                        />
                      </form>
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
