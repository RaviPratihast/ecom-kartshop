import React from "react";

const Button = ({ children, onClick }) => {
  return (
    <button className="button-whole" onClick={onClick}>
      {children}
    </button>
  );
};

export { Button };
