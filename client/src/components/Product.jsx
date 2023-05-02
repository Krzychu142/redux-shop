import React from "react";

const Product = ({ name, image, desc, price }) => {
  return (
    <div className="product">
      <h3>{name}</h3>
      <img src={image} alt={name} />
      <div className="details">
        <span>{desc}</span>
        <span className="price">${price}</span>
      </div>
      <button>Add To Cart</button>
    </div>
  );
};

export default Product;
