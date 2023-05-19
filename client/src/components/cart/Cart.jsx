import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import CartItem from './CartItem';
import { clearCart } from '../../features/cartSlice';
import CheckoutButton from './CheckoutButton';
import { ArrowLeftOutlined } from '@ant-design/icons';

const Cart = () => {
  const cart = useSelector((state) => state.cart);
  const { _id } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  return (
    <main className="cart-container">
      <h2>Shopping Cart</h2>
      {cart.cartItems.length === 0 ? (
        <div className="cart--empty">
          <p>Your cart is empty</p>
          <div className="start-shopping">
            <Link to="/">
              <ArrowLeftOutlined />
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
                  ${cart.cartTotalAmount}
                </span>
              </div>
              <p className="cart__subtotal-taxes">
                Taxes and shipping calculated at checkout
              </p>
              {_id ? (
                <CheckoutButton cartItems={cart.cartItems} />
              ) : (
                <Link to="/login">
                  <button className="checkout--not-logged">
                    Login to checkout
                  </button>
                </Link>
              )}
              <div className="continue-shopping">
                <Link to="/">
                  <ArrowLeftOutlined />
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
