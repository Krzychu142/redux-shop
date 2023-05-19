import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../../features/authSlice';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (auth._id) {
      navigate('/');
    }
    // eslint-disable-next-line
  }, [auth._id]);

  const [user, setUser] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser(user));
  };

  return (
    <div className="register__container">
      <form onSubmit={handleSubmit}>
        <h2>Login</h2>
        <input
          type="email"
          placeholder="Email"
          name="email"
          onChange={(e) => handleChange(e)}
        />
        <input
          type="password"
          placeholder="Password"
          name="password"
          onChange={(e) => handleChange(e)}
        />
        <button>Login</button>
        <div className="register--another-action">
          <p>Don't have an account?</p>
          <Link to="/register">Register</Link>
        </div>
        <div className="register--another-action">
          <p>Forgot password?</p>
          <Link to="/reset">Reset</Link>
        </div>
        {auth.message && <p>{auth.message}</p>}
      </form>
    </div>
  );
};

export default Login;
