import React from "react";
import "./styles.scss";

type Props = {
  title: string;
};

export default function TopBanner({ title }: Props) {
  return (
    <div className="banner-container">
      <div className="top-banner row">
        <div className="banner-title d-flex align-items-end">
          <h1 className="banner-title-text">{title}</h1>
        </div>
      </div>
    </div>
  );
}
