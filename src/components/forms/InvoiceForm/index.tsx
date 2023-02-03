import React from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { IInvoice } from "../../../interfaces";
import {
  countTotalAfterVoucher,
  countTotalPrice,
  toastFailed,
  toastSuccess,
  toRupiah,
} from "../../../utils/util";
import GenericButton from "../../buttons/GenericButton";
import CartItemCard from "../../cart/CartItemCard";
import GenericInput from "../../inputs/GenericInput";
import "./styles.scss";

type Props = {
  invoice: IInvoice | undefined;
};

export default function InvoiceForm({ invoice }: Props) {
  const navigate = useNavigate();
  const [cookies] = useCookies(["access_token"]);
  const API_URL = process.env.REACT_APP_API_URL_AUTH_USER + "/invoice";
  if (!invoice) {
    return <div></div>;
  }

  const handlePayInvoice = () => {
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + cookies.access_token,
      },
    };

    fetch(`${API_URL}/${invoice.id}`, requestOptions)
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
        toastSuccess("Payment Successful");
        navigate("/user/invoice");
        return;
      })
      .catch((error) => {
        toastFailed("Payment Failed");
        return;
      });
  };

  return (
    <div>
      <section className="h-100 h-custom cart-container">
        <div className="container h-100 py-5">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-6 form-container">
              <h2 className="invoice-title">INVOICE # {invoice.id}</h2>
              <h3>Courses</h3>
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

              <GenericInput
                error=""
                formText=""
                label="Status"
                name="status"
                onChange={() => {}}
                required={false}
                type="text"
                value={invoice.status}
                disabled={true}
              />

              <GenericInput
                error=""
                formText=""
                label="Voucher Code"
                name="voucher"
                onChange={() => {}}
                required={false}
                type="text"
                value={invoice.voucher_code ? invoice.voucher_code : "-"}
                disabled={true}
              />
              <GenericInput
                error=""
                formText=""
                label="Total (Before Discount)"
                name="total"
                onChange={() => {}}
                required={false}
                type="text"
                value={toRupiah(invoice.total)}
                disabled={true}
              />
              <GenericInput
                error=""
                formText=""
                label="Voucher Discount"
                name="voucher_discount"
                onChange={() => {}}
                required={false}
                type="text"
                value={
                  "-" +
                  (invoice.voucher
                    ? toRupiah(invoice.voucher.amount)
                    : toRupiah(0))
                }
                disabled={true}
              />
              <GenericInput
                error=""
                formText=""
                label="Benefit Discount"
                name="discount"
                onChange={() => {}}
                required={false}
                type="text"
                value={
                  "-" +
                  (invoice.voucher
                    ? toRupiah(
                        countTotalAfterVoucher(
                          invoice.total,
                          invoice.voucher.amount
                        ) * invoice.benefit_discount
                      )
                    : toRupiah(invoice.total * invoice.benefit_discount))
                }
                disabled={true}
              />

              <GenericInput
                error=""
                formText=""
                label="Total (After Discount)"
                name="total"
                onChange={() => {}}
                required={false}
                type="text"
                value={
                  invoice.voucher
                    ? toRupiah(
                        countTotalPrice(
                          invoice.total,
                          invoice.benefit_discount,
                          invoice.voucher.amount
                        )
                      )
                    : toRupiah(
                        invoice.total - invoice.total * invoice.benefit_discount
                      )
                }
                disabled={true}
              />

              {invoice.status === "awaiting_payment" && (
                <GenericButton label="Pay Now" onClick={handlePayInvoice} />
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
