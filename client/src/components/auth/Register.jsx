import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../../features/authSlice';
import { Link, useNavigate } from 'react-router-dom';
import { loadUser } from '../../features/authSlice';

const Register = () => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(loadUser());
    if (auth._id) {
      navigate('/cart');
    }
    // eslint-disable-next-line
  }, [auth._id]);

  const [user, setUser] = useState({
    name: '',
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
    dispatch(registerUser(user));
  };

  return (
    <div className="register__container">
      <form onSubmit={handleSubmit}>
        <h2>Register</h2>
        <input
          type="text"
          placeholder="Name"
          name="name"
          onChange={(e) => handleChange(e)}
        />
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
        <button>Register</button>
        <div className="register--another-action">
          <p>
            Already have an account?
            <Link to="/login">Login</Link>
          </p>
        </div>
        {auth.message && <p>{auth.message}</p>}
      </form>
    </div>
  );
};

export default Register;
