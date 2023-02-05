import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useDispatch, useSelector } from "react-redux";
import InvoiceFilterForm from "../../../components/forms/InvoiceFilterForm";
import TopBanner from "../../../components/heroes/TopBanner";
import GenericPagination from "../../../components/navigations/GenericPagination";
import InvoiceTable from "../../../components/tables/InvoiceTable";
import { RootState } from "../../../store";
import {
  fetchInvoices,
  InvoiceDispatch,
} from "../../../store/slices/user/invoice/invoiceSlice";

export default function InvoicePage() {
  const { invoices } = useSelector((state: RootState) => state.invoice);
  const invoiceDispatch: InvoiceDispatch = useDispatch();
  const [pageNumber, setPageNumber] = React.useState(1);
  const [pageTotal] = React.useState(1);
  const [cookies] = useCookies(["access_token"]);
  const [currentSortDir, setCurrentSortDir] = useState<string>("desc");
  const [filterStatus, setFilterStatus] = useState<string>("");
  const [filterDate, setFilterDate] = useState<string>("");

  useEffect(() => {
    invoiceDispatch(
      fetchInvoices({
        page: pageNumber,
        search: "",
        size: 10,
        sortBy: "created_at",
        sortDir: currentSortDir,
        last: filterDate,
        tags: "",
        category: "",
        status: filterStatus,
        access_token: cookies.access_token,
      })
    );
  }, [
    pageNumber,
    currentSortDir,
    filterDate,
    cookies,
    invoiceDispatch,
    filterStatus,
  ]);

  const handleStatusChange = (newValue: any, actionMeta: any) => {
    setFilterStatus(newValue.value);
    setPageNumber(1);
  };

  const handleDateChange = (newValue: any, actionMeta: any) => {
    setFilterDate(newValue.value);
    setPageNumber(1);
  };

  const handleSortDirChange = (newValue: any, actionMeta: any) => {
    setCurrentSortDir(newValue.value);
    setPageNumber(1);
  };

  return (
    <div>
      <TopBanner title="INVOICES" />
      <InvoiceFilterForm
        handleStatusChange={handleStatusChange}
        handleDateChange={handleDateChange}
        handleSortDirChange={handleSortDirChange}
      />
      <InvoiceTable invoices={invoices} />
      <GenericPagination
        pageNumber={pageNumber}
        pageTotal={pageTotal}
        setPageNumber={setPageNumber}
      />
    </div>
  );
}
