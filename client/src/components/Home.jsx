import React from "react";
import { useGetAllProductsQuery } from "../features/productsApi";

const Home = () => {
	const { data, error, isLoading } = useGetAllProductsQuery();
	console.log(data);
	return <div>Home</div>;
};

export default Home;
