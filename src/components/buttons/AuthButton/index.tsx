import React from "react";

type Props = {
  label: string;
  classNames: string;
};

export default function index({ label, classNames }: Props) {
  return (
    <div>
      <button
        type="submit"
        className={`btn btn-primary btn-submit ${classNames}`}
      >
        {label}
      </button>
    </div>
  );
}
