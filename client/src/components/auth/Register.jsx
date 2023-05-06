import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../../features/authSlice';

const Register = () => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.auth);
  console.log(state);
  console.log(state.response);
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
    <div>
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
      </form>
    </div>
  );
};

export default Register;
