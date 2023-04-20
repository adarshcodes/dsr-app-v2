import React from "react";

function Button({ value, varient, customClass, icon, onclick }) {
  return (
    <div
      className={`btn ${
        varient === "btn-light" ? "btn-light" : "btn-dark"
      } ${customClass}`}
      onClick={(e) => onclick()}
    >
      {icon && <img src={icon} alt="ms icon" />}

      <p>{value}</p>
    </div>
  );
}

export default Button;
