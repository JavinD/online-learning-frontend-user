import React from "react";

type Props = {
  label: string;
  type: string;
  formText: string;
};

export default function index({ label, type, formText }: Props) {
  return (
    <div>
      <label className="form-label auth-form-label">{label}</label>
      <input type={type} className="form-control" id="exampleInputPassword1" />
      {formText ? <div className="form-text">{formText}</div> : ""}
    </div>
  );
}
