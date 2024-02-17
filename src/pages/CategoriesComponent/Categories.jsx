import React, { useContext, useEffect } from "react";
import CategoriesCard from "./CategoriesCard";
import ContextApp from "../../contextApp/context";
import { getCategoriesAxiosFunction } from "../../getAxios/axiosCategories";

const Categories = ({ colorMode }) => {
    const {  dispatch } = useContext(ContextApp);
    const url = "https://online-shop-db.onrender.com/categories";
    useEffect(() => {
        getCategoriesAxiosFunction(url, dispatch);
    }, []);

    return (
        <>
            <CategoriesCard colorMode={colorMode}/>
        </>
    );
};

export default Categories;
