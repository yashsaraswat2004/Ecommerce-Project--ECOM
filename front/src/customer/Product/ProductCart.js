import React from "react";
import "./Product.css";
import { useNavigate } from "react-router-dom";

const ProductCart = ({ product }) => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate(`/product/${product?._id}`);
  };
  return (
    <div
      onClick={handleNavigate}
      className="productCard w-[15rem] mx-3 transition-all cursor-pointer"
    >
      <div className="h-[20rem]">
        <img
          className=" w-full h-full object-left-top object-contain"
          src={product.imageUrl}
          alt=""
        />
      </div>

      <div className="textPart bg-white p-3">
        <div>
          <p className="font-bold opacity-60">{product.brand}</p>
          <p className="">{product.title}</p>
        </div>
        <div className=" items-center scroll-px-2">
          <p className="font-semibold">₹ {product.price}</p>
          <p className="opacity-60">(Inclusive of all taxes)</p>
        </div>
      </div>
    </div>
  );
};

export default ProductCart;
