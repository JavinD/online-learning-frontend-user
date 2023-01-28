import React from "react";
import "./styles.scss";

type Props = {
  label: string;
  onClick?: () => void;
  disabled?: boolean;
};

export default function GenericButton({ label, onClick, disabled }: Props) {
  return (
    <div>
      <button className="btn generic-btn" onClick={onClick} disabled={disabled}>
        {label}
      </button>
    </div>
  );
}
