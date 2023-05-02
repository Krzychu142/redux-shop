import React from "react";
import { useGetAllProductsQuery } from "../features/productsApi";
// import { useSelector } from "react-redux"; only for async thunk
import Product from "./Product";

const Home = () => {
  const { data, error, isLoading } = useGetAllProductsQuery();
  // const {items, status} = useSelector((state) => state.products); only for async thunk

  return (
    <div className="home-container">
      {isLoading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>An error occured</p>
      ) : (
        <>
          <h2>New Arrivals</h2>
          <div className="products">
            {data?.map((product) => (
              <Product
                key={product.id}
                name={product.name}
                image={product.image}
                desc={product.desc}
                price={product.price}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Home;
