import React from 'react';
import { useDispatch } from 'react-redux';
import {
  removeFromCart,
  addToCart,
  decrementItem,
} from '../../features/cartSlice';

const CartItem = (props) => {
  const { image, name, desc, price, cartQuantity } = props.item;
  const dispatch = useDispatch();

  return (
    <div className="cart__item">
      <div className="cart-product">
        <img src={image} alt={name} />
        <div>
          <h3>{name}</h3>
          <p>{desc}</p>
          <button onClick={() => dispatch(removeFromCart(props.item))}>
            Remove
          </button>
        </div>
      </div>
      <div className="cart-product__price">
        <span>${price}</span>
      </div>
      <div className="cart-product__quantity">
        <button onClick={() => dispatch(decrementItem(props.item))}>-</button>
        <span className="count">{cartQuantity}</span>
        <button onClick={() => dispatch(addToCart(props.item))}>+</button>
      </div>
      <div className="cart-product__total">
        <span>${price * cartQuantity}</span>
      </div>
    </div>
  );
};

export default CartItem;
