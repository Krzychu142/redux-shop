import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { resetPassword } from '../../../features/passwordResetSlice';

const Reset = () => {
  const dispatch = useDispatch();
  const { message, status } = useSelector((state) => state.passwordReset);

  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(resetPassword(email));
  };

  return (
    <div className="register__container">
      <form onSubmit={(e) => handleSubmit(e)}>
        <h2>Reset</h2>
        <input
          type="email"
          placeholder="Email"
          name="email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <button>Reset</button>
        <div className="register--another-action">
          <p>Provide email to send link to reset</p>
        </div>
        {status === 'succeeded' && <p className="succeeded">{message}</p>}
        {status === 'failed' && <p>{message}</p>}
      </form>
    </div>
  );
};

export default Reset;
