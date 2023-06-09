import React from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { baseUrl } from '../../features/api';

const PayButton = ({ cartItems }) => {
  const { _id } = useSelector((state) => state.auth);

  const handleCheckout = () => {
    axios
      .post(`${baseUrl}/stripe/create-checkout-session`, {
        cartItems,
        _id,
      })
      .then((res) => {
        if (res.data.url) {
          window.location.href = res.data.url;
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <button onClick={() => handleCheckout()}>Checko Out</button>
    </div>
  );
};

export default PayButton;
