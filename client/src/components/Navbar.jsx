import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../features/authSlice';
import { ShoppingCartOutlined, LogoutOutlined } from '@ant-design/icons';

const Navbar = () => {
  const { cartTotalQuantity } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const auth = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate('/');
  };

  return (
    <nav className="nav-bar">
      <Link to="/">
        <h2>OnlineShop</h2>
      </Link>
      <div className="nav-bag">
        <Link to="/cart">
          <div className="nav-bag__bag-icno">
            <ShoppingCartOutlined className="custom-icon" />
            <span className="bag-quantiti">
              <span>{cartTotalQuantity}</span>
            </span>
          </div>
        </Link>

        {auth._id ? (
          <div className="cart__links">
            <p onClick={() => handleLogout()}>
              Logout
              <LogoutOutlined className="custom-icon" />
            </p>
          </div>
        ) : (
          <div className="cart__links">
            <Link to="/register">Register</Link>
            <Link to="/login">Login</Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
