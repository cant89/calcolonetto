import React from "react";

export default function Radio({ label, inputProps }) {
  return (
    <div>
      <input type="radio" {...inputProps} />
      {label}
    </div>
  );
}
