import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { resetPassword } from '../../../features/passwordResetSlice';

const Reset = () => {
  const emailRef = useRef(null);
  const dispatch = useDispatch();
  const { message, status } = useSelector((state) => state.passwordReset);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (emailRef.current.value) {
      dispatch(resetPassword(emailRef.current.value));
    }
  };

  useEffect(() => {
    if (status === 'succeeded') {
      emailRef.current.value = '';
    }
  }, [status, message]);

  return (
    <div className="register__container">
      <form onSubmit={(e) => handleSubmit(e)}>
        <h2>Reset</h2>
        <input ref={emailRef} type="email" placeholder="Email" name="email" />
        <button>Reset</button>
        <div className="register--another-action">
          <p>Provide email to send link to reset</p>
        </div>
        {status === 'succeeded' && <p className="succeeded">{message}</p>}
        {status === 'failed' && message && <p>{message}</p>}
        {status === 'failed' && !message && (
          <p>Too many requests in 15min. Try again later.</p>
        )}
      </form>
    </div>
  );
};

export default Reset;
