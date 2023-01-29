import React from "react";
import { ICartItem } from "../../../interfaces";
import { toRupiah } from "../../../utils/util";
import CourseCategory from "../../course/Category";
import "./style.scss";

type Props = {
  cartItem: ICartItem;
};

export default function CartItemCard({ cartItem }: Props) {
  return (
    <div className="d-flex align-items-center mb-5 border shadow-sm bg-light">
      <div className="flex-shrink-0">
        <img
          src={cartItem.course.img_thumbnail}
          className="img-fluid"
          style={{ width: 150 }}
          alt="Generic placeholder"
        />
      </div>
      <div className="flex-grow-1 ms-3">
        <a href="#!" className="float-end text-black">
          <i className="fas fa-times" />
        </a>
        <h5 className="cart-item-title">{cartItem.course.title}</h5>
        <div className="col-md-4 d-flex justify-content-center">
          <CourseCategory label={cartItem.course.category.name} />
        </div>

        <div className="d-flex align-items-center">
          <p className="fw-bold mb-0 me-5 pe-3">
            {toRupiah(cartItem.course.price)}
          </p>
          <div className="def-number-input">
            <span>
              Quantity: <strong>1</strong>
            </span>
          </div>
        </div>
      </div>
      <button className="btn btn-remove">X</button>
    </div>
  );
}
