import React, { useEffect } from "react";
import { useCookies } from "react-cookie";
import { useDispatch, useSelector } from "react-redux";
import GenericButton from "../../../components/buttons/GenericButton";
import CartIcon from "../../../components/cart/CartIcon";
import CartItemCard from "../../../components/cart/CartItemCard";
import GenericInput from "../../../components/inputs/GenericInput";
import { RootState } from "../../../store";
import { CartDispatch, fetchCart } from "../../../store/slices/cart/cartSlice";
import { countCartTotal, toRupiah } from "../../../utils/util";
import "./styles.scss";

type Props = {};

export default function ShoppingCart({}: Props) {
  const { cart } = useSelector((state: RootState) => state.cart);
  const [cookies] = useCookies(["token"]);
  const [isVoucherUsed, setIsVoucherUsed] = React.useState(false);
  const [voucher, setVoucher] = React.useState("");
  const [total, setTotal] = React.useState(0);

  const cartDispatch: CartDispatch = useDispatch();

  const handleVoucherChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVoucher(e.target.value);
  };

  useEffect(() => {
    cartDispatch(fetchCart(cookies.token));
  }, [cartDispatch, cookies.token]);

  useEffect(() => {
    setTotal(countCartTotal(cart));
  }, [cart]);

  return (
    <div>
      <section className="h-100 h-custom" style={{ backgroundColor: "#eee" }}>
        <div className="container h-100 py-5">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col">
              <div className="card shopping-cart" style={{ borderRadius: 15 }}>
                <div className="card-body text-black">
                  <div className="row">
                    <div className="col-lg-6 px-5 py-4">
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
                      <div className="d-flex justify-content-between px-x">
                        <p className="fw-bold">Discount:</p>
                        <p className="fw-bold">95$</p>
                      </div>
                      <div className="d-flex justify-content-between p-2 mb-2 total">
                        <h5 className="fw-bold mb-0">Total:</h5>
                        <h5 className="fw-bold mb-0">{toRupiah(total)}</h5>
                      </div>
                    </div>
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

                      <form className="mb-5">
                        <GenericInput
                          error=""
                          formText=""
                          label=""
                          name="voucher"
                          onChange={handleVoucherChange}
                          required={false}
                          type="text"
                          value={voucher}
                        />
                        <GenericButton label="Checkout" />
                        <h5
                          className="fw-bold mb-5"
                          style={{ position: "absolute", bottom: 0 }}
                        ></h5>
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
