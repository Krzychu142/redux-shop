import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { clearCart } from '../../../features/cartSlice';

const CheckoutSuccess = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(clearCart());
  }, []);

  return (
    <div>
      <h2>Checkout Success</h2>
    </div>
  );
};

export default CheckoutSuccess;
