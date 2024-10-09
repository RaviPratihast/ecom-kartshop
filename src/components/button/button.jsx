import React from "react";

const Button = ({ children, onClick, className }) => {
  return (
    <button className={`button-whole ${className}`} onClick={onClick}>
      {children}
    </button>
  );
};

export { Button };
