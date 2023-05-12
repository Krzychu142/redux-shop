import React from 'react';
import { useGetAllProductsQuery } from '../features/productsApi';
// import { useSelector } from "react-redux"; only for async thunk
import Product from './Product';
import '../styles/home.css';

const Home = () => {
  const { data, error, isLoading } = useGetAllProductsQuery();
  // const {items, status} = useSelector((state) => state.products); only for async thunk

  return (
    <main className="home-container">
      {isLoading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>An error occured</p>
      ) : (
        <>
          <h2>New Arrivals</h2>
          <div className="home-products">
            {data?.map((product) => (
              <Product key={product.id} product={product} />
            ))}
          </div>
        </>
      )}
    </main>
  );
};

export default Home;
