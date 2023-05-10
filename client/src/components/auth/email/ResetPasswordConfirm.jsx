import React from 'react';
import { useParams } from 'react-router-dom';

const ResetPasswordConfir = () => {
  const { token } = useParams();

  console.log(token);
  return <div>ResetPasswordConfir</div>;
};

export default ResetPasswordConfir;
