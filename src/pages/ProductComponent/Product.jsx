import React, { useContext, useEffect } from "react";
import ProductCard from "./ProductCard";

import ContextApp from "../../contextApp/context";
import { getProductsAxiosFunction } from "../../getAxios/axiosCategories";

const Product = ({ colorMode }) => {
    const { state, dispatch } = useContext(ContextApp);
    const url = "https://online-shop-db.onrender.com/products";
    useEffect(() => {
        const fetchData = async () => {
            try {
                await getProductsAxiosFunction(url, dispatch);
            } catch (error) {
                console.error("Ошибка при загрузке продуктов:", error);
            }
        };

        fetchData();
    }, [url, dispatch]);
    return (
        <>
            <ProductCard
                colorMode={colorMode}
                load={state.isLoadingProducts}
            />
        </>
    );
};

export default Product;
