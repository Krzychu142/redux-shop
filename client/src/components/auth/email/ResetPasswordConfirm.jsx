import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { resetPasswordConfirm } from '../../../features/passwordResetSlice';
import '../../../styles/auth-forms.css';

const ResetPasswordConfir = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { token } = useParams();
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [isDisabled, setIsDisabled] = useState(true);

  const { message, status } = useSelector(
    (state) => state.passwordReset.resetPasswordConfirm
  );

  useEffect(() => {
    if (password.length > 6 && password2 === password) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [password, password2]);

  useEffect(() => {
    if (status === 'succeeded') {
      setPassword('');
      setPassword2('');
      // navigate('/login');
    }
  }, [status, message, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      token,
      password,
    };
    dispatch(resetPasswordConfirm(data));
  };

  return (
    <div className="register__container">
      <form onSubmit={handleSubmit}>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Type new password"
          required
        />
        <input
          type="password"
          value={password2}
          onChange={(e) => setPassword2(e.target.value)}
          placeholder="Confirm new password"
          required
        />
        <button type="submit" disabled={isDisabled}>
          Set new password
        </button>
        {status !== 'idle' && (
          <p style={{ color: 'black' }}>Status: {status}</p>
        )}
        {status === 'failed' && <p className="failed">{message}</p>}
        {status === 'succeeded' && (
          <>
            <p className="succeeded">Message: {message}</p>
            <p className="succeeded">
              {message}, now You can <Link to="/login">login</Link>
            </p>
          </>
        )}
      </form>
    </div>
  );
};

export default ResetPasswordConfir;
