import React from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { baseUrl } from '../../features/api';

const PayButton = () => {
  const { user } = useSelector((state) => state.auth);
  const { cart, total } = useSelector((state) => state.cart);

  const handleCheckout = async () => {
    const products = cart.map((item) => ({
      id: item.id,
      quantity: item.quantity,
    }));

    const body = {
      products,
      total,
      user,
    };

    const res = await axios.post(`${baseUrl}/api/checkout`, body);
    console.log(res);
  };

  return (
    <div>
      <button onClick={() => handleCheckout()}>Checko Out</button>
    </div>
  );
};

export default PayButton;
