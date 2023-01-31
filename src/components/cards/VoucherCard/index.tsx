import { time } from "console";
import React from "react";
import { isExpired } from "react-jwt";
import { IUserVoucher, IVoucher } from "../../../interfaces";
import {
  isDateExpired,
  toastSuccess,
  toDate,
  toRupiah,
} from "../../../utils/util";
import GenericButton from "../../buttons/GenericButton";
import ToastComponent from "../../toast";
import "./styles.scss";

type Props = {
  voucher: IUserVoucher;
};

export default function VoucherCard({ voucher }: Props) {
  const [isVoucherExpired, setIsVoucherExpired] = React.useState(false);

  React.useEffect(() => {
    setIsVoucherExpired(isDateExpired(new Date(voucher.expired_at)));
  }, [voucher.expired_at]);

  return (
    <div className="col-6">
      <ToastComponent />
      <div className="card">
        <section className="date">
          <time>
            <span>{voucher.voucher_code}</span>
            <span>{toRupiah(voucher.voucher.amount)}</span>
          </time>
        </section>
        <section className="card-cont">
          <small>Rewards Voucher</small>
          <h3 className={isVoucherExpired ? "expired" : ""}>
            {voucher.voucher.name}
          </h3>

          <div className="even-info">
            <span>Voucher Expired Date:</span>
            <br />
            <span>{toDate(voucher.expired_at)}</span>
          </div>
          <div
            className={
              "btn voucher-status " +
              (isVoucherExpired ? "btn-secondary" : "btn-success")
            }
          >
            {isVoucherExpired ? "EXPIRED" : "VALID"}
          </div>

          <GenericButton
            onClick={() => {
              navigator.clipboard.writeText(voucher.voucher_code);
              toastSuccess("Voucher code copied to clipboard");
            }}
            label="Copy Code"
            disabled={isVoucherExpired}
          />
        </section>
      </div>
    </div>
  );
}
