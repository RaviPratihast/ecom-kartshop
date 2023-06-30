import React from "react";
import { useParams } from "react-router-dom";

const ProductDetails = () => {
  const { productDetailsId } = useParams();
  console.log(productDetailsId);
  return <div>{productDetailsId}</div>;
};

export { ProductDetails };
