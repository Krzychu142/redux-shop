import React, { useState } from 'react';

const Reset = () => {
  const [email, setEmail] = useState('');

  return (
    <div className="register__container">
      <form onSubmit={() => console.log('elo')}>
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
        {/* {auth.message && <p>{auth.message}</p>} */}
      </form>
    </div>
  );
};

export default Reset;
