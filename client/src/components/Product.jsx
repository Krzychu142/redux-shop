import React from 'react';
import '../styles/product.css';
import { useDispatch } from 'react-redux';
import { addToCart } from '../features/cartSlice';

const Product = (props) => {
  const { name, image, desc, price } = props.product;
  const dispatch = useDispatch();

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  };

  return (
    <div className="product">
      <h3>{name}</h3>
      <img src={image} alt={name} />
      <div className="details">
        <span>{desc}</span>
        <span className="price">${price}</span>
      </div>
      <button onClick={() => handleAddToCart(props.product)}>
        Add To Cart
      </button>
    </div>
  );
};

export default Product;
