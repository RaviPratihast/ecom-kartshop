import React from "react";

const Button = ({
  children,
  onClick,
  className = "",
  type = "button",
  variant = "primary",
  size = "md",
}) => {
  return (
    <button
      type={type}
      className={`button-whole button-${variant} button-${size} ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export { Button };
