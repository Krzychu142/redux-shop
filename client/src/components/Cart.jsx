import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import '../styles/cart.css';
import CartItem from './CartItem';
import { clearCart } from '../features/cartSlice';

const Cart = () => {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  return (
    <main className="cart-container">
      <h2>Shopping Cart</h2>
      {cart.cartItems.length === 0 ? (
        <div className="cart--empty">
          <p>Your cart is empty</p>
          <div className="start-shopping">
            <Link to="/">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-arrow-return-left"
                viewBox="0 0 16 16"
              >
                <path
                  fillRule="evenodd"
                  d="M14.5 1.5a.5.5 0 0 1 .5.5v4.8a2.5 2.5 0 0 1-2.5 2.5H2.707l3.347 3.346a.5.5 0 0 1-.708.708l-4.2-4.2a.5.5 0 0 1 0-.708l4-4a.5.5 0 1 1 .708.708L2.707 8.3H12.5A1.5 1.5 0 0 0 14 6.8V2a.5.5 0 0 1 .5-.5z"
                />
              </svg>
              <span>Start Shopping</span>
            </Link>
          </div>
        </div>
      ) : (
        <div>
          <div className="cart__titles">
            <h3 className="product-title">Product</h3>
            <h3 className="price">Price</h3>
            <h3 className="quantity">Quantity</h3>
            <h3 className="total">Total</h3>
          </div>
          <div className="cart__items">
            {cart?.cartItems.map((item) => {
              return <CartItem key={item.id} item={item} />;
            })}
          </div>
          <div className="cart__summary">
            <button
              className="clear-cart"
              onClick={() => dispatch(clearCart())}
            >
              Clear Cart
            </button>
            <div className="cart__checkout">
              <div className="cart__subtotal">
                <span>Subtotal</span>
                <span className="cart__subtotal-price">
                  {cart.cartTotalAmount}
                </span>
              </div>
              <p>Taxes and shipping calculated at checkout</p>
              <button className="checkout">Checkout</button>
              <div className="continue-shopping">
                <Link to="/">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-arrow-return-left"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fillRule="evenodd"
                      d="M14.5 1.5a.5.5 0 0 1 .5.5v4.8a2.5 2.5 0 0 1-2.5 2.5H2.707l3.347 3.346a.5.5 0 0 1-.708.708l-4.2-4.2a.5.5 0 0 1 0-.708l4-4a.5.5 0 1 1 .708.708L2.707 8.3H12.5A1.5 1.5 0 0 0 14 6.8V2a.5.5 0 0 1 .5-.5z"
                    />
                  </svg>
                  <span>Continue shopping</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

export default Cart;
