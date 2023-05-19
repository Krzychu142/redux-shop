import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from './components/Navbar';
import Cart from './components/cart/Cart';
import Home from './components/Home';
import NotFound from './components/NotFound';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Reset from './components/auth/email/ResetPasswordProvider';
import ResetPassword from './components/auth/email/ResetPasswordConfirm';
import CheckoutSuccess from './components/cart/checkout/CheckoutSuccess';
import Footer from './components/Footer';

function App() {
  return (
    <div className="site">
      <BrowserRouter>
        <ToastContainer autoClose={1500} closeButton={false} />
        {/* It's allows to use toastify notification in appliaction. */}
        <Navbar />
        <Routes>
          <Route exact path="/cart" element={<Cart />} />
          <Route exact path="/" element={<Home />} />
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/reset" element={<Reset />} />
          <Route
            exact
            path="/reset-password/:token"
            element={<ResetPassword />}
          />
          <Route exact path="/checkout-success" element={<CheckoutSuccess />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
