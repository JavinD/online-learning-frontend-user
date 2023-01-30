import React, { useEffect, useRef } from "react";
import { useCookies } from "react-cookie";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useParams } from "react-router-dom";
import CartItemCard from "../../../components/cart/CartItemCard";
import InvoiceForm from "../../../components/forms/InvoiceForm";
import { RootState } from "../../../store";
import {
  fetchInvoiceDetail,
  InvoiceDetailDispatch,
} from "../../../store/slices/user/invoice/invoiceDetailSlice";
import { countTotalPrice, toRupiah } from "../../../utils/util";

export default function InvoicePayPage() {
  const { invoice } = useSelector((state: RootState) => state.invoiceDetail);
  const invoiceDetailDispatch: InvoiceDetailDispatch = useDispatch();
  const { id } = useParams();
  const [cookies] = useCookies(["token"]);
  const discount = useRef(0);
  const total = useRef(0);
  const idNum = Number(id);

  useEffect(() => {
    invoiceDetailDispatch(
      fetchInvoiceDetail({
        id: idNum,
        token: cookies.token,
      })
    );
  }, [invoiceDetailDispatch, cookies.token, idNum]);

  useEffect(() => {
    if (invoice) {
      discount.current = invoice.benefit_discount;
      total.current = invoice.total;
    }
  }, [invoice]);
  return (
    <div>
      <InvoiceForm invoice={invoice} />
    </div>
  );
}
