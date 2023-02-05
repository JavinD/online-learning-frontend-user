import { useEffect, useRef } from "react";
import { useCookies } from "react-cookie";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import InvoiceForm from "../../../components/forms/InvoiceForm";
import { RootState } from "../../../store";
import {
  fetchInvoiceDetail,
  InvoiceDetailDispatch,
} from "../../../store/slices/user/invoice/invoiceDetailSlice";

export default function InvoicePayPage() {
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
    <div className="mt-5">
      <InvoiceForm invoice={invoice} cookies={cookies} />
    </div>
  );
}
