import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/navbar.css';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../features/authSlice';

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
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="35"
              height="35"
              fill="currentColor"
              className="bi bi-bag-fill"
              viewBox="0 0 16 16"
            >
              <path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1zm3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5z" />
            </svg>
            <span className="bag-quantiti">
              <span>{cartTotalQuantity}</span>
            </span>
          </div>
        </Link>

        {auth._id ? (
          <div className="cart__links">
            <p onClick={() => handleLogout()}>Logout</p>
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
