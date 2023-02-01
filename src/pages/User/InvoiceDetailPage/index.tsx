import { useEffect, useRef } from "react";
import { useCookies } from "react-cookie";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import CartItemCard from "../../../components/cart/CartItemCard";
import { RootState } from "../../../store";
import {
  fetchInvoiceDetail,
  InvoiceDetailDispatch,
} from "../../../store/slices/user/invoice/invoiceDetailSlice";
import { countTotalPrice, toRupiah } from "../../../utils/util";

export default function InvoiceDetailPage() {
  const { invoice } = useSelector((state: RootState) => state.invoiceDetail);
  const invoiceDetailDispatch: InvoiceDetailDispatch = useDispatch();
  const { id } = useParams();
  const [cookies] = useCookies(["access_token"]);
  const discount = useRef(0);
  const total = useRef(0);
  const idNum = Number(id);

  useEffect(() => {
    invoiceDetailDispatch(
      fetchInvoiceDetail({
        id: idNum,
        access_token: cookies.access_token,
      })
    );
  }, [invoiceDetailDispatch, cookies.access_token, idNum]);

  useEffect(() => {
    if (invoice) {
      discount.current = invoice.benefit_discount;
      total.current = invoice.total;
    }
  }, [invoice]);

  return (
    <div>
      <section className="h-100 h-custom cart-container">
        <div className="container h-100 py-5">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col">
              <div className="card shopping-cart" style={{ borderRadius: 15 }}>
                <div className="card-body text-black">
                  <div className="row">
                    <div className="col-lg-6 px-5 py-4">
                      <h3 className="mb-5 pt-2 text-center fw-bold text-uppercase ">
                        Invoice
                      </h3>
                      {invoice?.transactions && invoice.transactions.length > 0
                        ? invoice.transactions.map((item) => {
                            return (
                              <CartItemCard
                                handleRemoveItem={() => {}}
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
                          <span className={"level "}>
                            ({discount.current * 100}
                            %)
                          </span>
                          :
                        </p>
                        <p className="fw-bold">
                          - {toRupiah(discount.current * total.current)}
                        </p>
                      </div>
                      <div className="d-flex justify-content-between p-2 mb-2 total">
                        <h5 className="fw-bold mb-0">Total:</h5>
                        <h5 className="fw-bold mb-0">
                          {toRupiah(
                            countTotalPrice(total.current, discount.current, 0)
                          )}
                        </h5>
                      </div>
                    </div>
                    {
                      <div className="col-lg-6 px-5 py-4">
                        <h3 className="mb-5 pt-2 text-center fw-bold text-uppercase">
                          Pay Here <span className="fw-light">(QR CODE)</span>
                        </h3>

                        {/* Generate QR CODE */}
                        <div className="d-flex flex-column justify-content-center ">
                          <div className="d-flex justify-content-center">
                            <img
                              src={`https://api.qrserver.com/v1/create-qr-code/?size=225x225&data=${
                                window.location.href + "/pay"
                              }`}
                              alt="QR Code"
                            />
                          </div>
                          <br />
                          <br />

                          {/* Invoice Status */}
                          <div className="d-flex flex-column justify-content-center align-items-center">
                            <h5 className="fw-bold mb-0">Status:</h5>
                            <h5 className="fw-bold mb-0">
                              {invoice?.status === "awaiting_payment"
                                ? "Waiting for payment"
                                : invoice?.status === "completed"
                                ? "Payment Success"
                                : invoice?.status === "canceled"
                                ? "Payment Canceled"
                                : invoice?.status === "awaiting_confirmation"
                                ? "Waiting for payment confirmation"
                                : "Unknown"}
                            </h5>
                          </div>
                        </div>
                      </div>
                    }
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
