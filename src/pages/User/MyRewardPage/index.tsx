import React, { useEffect } from "react";
import { useCookies } from "react-cookie";
import { useDispatch, useSelector } from "react-redux";
import VoucherCard from "../../../components/cards/VoucherCard";
import TopBanner from "../../../components/heroes/TopBanner";
import { RootState } from "../../../store";
import {
  fetchUserVoucher,
  UserVoucherDispatch,
} from "../../../store/slices/user/voucher/userVoucherSlice";
import "./styles.scss";

export default function MyRewardPage() {
  const [cookies] = useCookies(["access_token"]);
  const { voucher } = useSelector((state: RootState) => state.userVoucher);
  const userVoucherDispatch: UserVoucherDispatch = useDispatch();

  useEffect(() => {
    userVoucherDispatch(fetchUserVoucher(cookies.access_token));
  }, [userVoucherDispatch, cookies.access_token]);

  return (
    <div>
      <TopBanner title="MY REWARDS" />
      <section className="h-100 h-custom ">
        <div className="container h-100 py-5">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col voucher-container">
              <div className="voucher-list">
                <section className="row g-2">
                  <h1>Vouchers</h1>

                  {voucher && voucher.length > 0 ? (
                    voucher.map((voucher) => (
                      <VoucherCard key={voucher.id} voucher={voucher} />
                    ))
                  ) : (
                    <div>
                      {/* No Vouchers available */}
                      <h3 className="text-center">No Vouchers Available</h3>
                    </div>
                  )}
                </section>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
