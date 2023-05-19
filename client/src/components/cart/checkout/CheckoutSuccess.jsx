import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { clearCart } from '../../../features/cartSlice';
import { Link } from 'react-router-dom';
import { Result } from 'antd';

const CheckoutSuccess = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(clearCart());
  }, [dispatch]);

  return (
    <div>
      <Result
        status="success"
        title="Successfully Purchased Cloud Server ECS!"
        // subTitle="Order number: 2017182818828182881 Cloud server configuration takes 1-5 minutes, please wait."
        extra={[<Link to="/">Back Home</Link>]}
      />
    </div>
  );
};

export default CheckoutSuccess;
