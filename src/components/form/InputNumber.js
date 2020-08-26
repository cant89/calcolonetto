import React from "react";

export default function InputNumber({ label, inputProps }) {
  return (
    <div>
      {label}
      <input type="number" {...inputProps} />
    </div>
  );
}
