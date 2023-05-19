import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addToCart } from '../features/cartSlice';
import { Image } from 'antd';

const Product = (props) => {
  const { name, image, desc, price } = props.product;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
    navigate('/cart');
  };

  return (
    <div className="product">
      <h3>{name}</h3>
      <Image className="product-image" src={image} alt={desc} />
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
