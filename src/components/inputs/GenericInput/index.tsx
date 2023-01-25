import React, { ChangeEventHandler } from "react";

type Props = {
  label: string;
  type: string;
  formText: string;
  value: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  name: string;
};

export default function index({
  label,
  type,
  formText,
  value,
  onChange,
  name,
}: Props) {
  return (
    <div>
      <label className="form-label auth-form-label">{label}</label>
      <input
        type={type}
        className="form-control"
        id="exampleInputPassword1"
        value={value}
        onChange={onChange}
        name={name}
      />
      {formText ? <div className="form-text">{formText}</div> : ""}
    </div>
  );
}
