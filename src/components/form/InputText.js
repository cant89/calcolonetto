import React from "react";

export default function InputText({ label, inputProps }) {
  return (
    <div>
      {label}
      <input type="text" {...inputProps} />
    </div>
  );
}
