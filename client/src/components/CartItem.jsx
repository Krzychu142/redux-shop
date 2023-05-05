import React from 'react';
import '../styles/cart.css';

const CartItem = ({ image, name, desc, price, quantity }) => {
  return (
    <div className="cart__item">
      <div className="cart-product">
        <img src={image} alt={name} />
        <div>
          <h3>{name}</h3>
          <p>{desc}</p>
          <button>Remove</button>
        </div>
      </div>
      <div className="cart-product__price">
        <span>${price}</span>
      </div>
      <div className="cart-product__quantity">
        <button>-</button>
        <span className="count">{quantity}</span>
        <button>+</button>
      </div>
      <div className="cart-product__total">
        <span>${price * quantity}</span>
      </div>
    </div>
  );
};

export default CartItem;
