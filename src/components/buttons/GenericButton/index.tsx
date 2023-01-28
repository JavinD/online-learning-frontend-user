import React from "react";
import "./styles.scss";

type Props = {
  label: string;
};

export default function GenericButton({ label }: Props) {
  return (
    <div>
      <button className="btn generic-btn">{label}</button>
    </div>
  );
}
