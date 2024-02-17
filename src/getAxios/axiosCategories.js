import axios from "axios";

export async function getCategoriesAxiosFunction(url, dispatch) {
    try {
        dispatch({ type: "LOADING_CATEGORIES" });
        const res = await axios.get(url);
        dispatch({ type: "GET_CATEGORIES", payload: res.data });
    } catch (error) {
        console.log(error);
    }
}

export async function getProductsAxiosFunction(url, dispatch) {
    try {
        dispatch({ type: "LOADING_PRODUCTS" });
        let res = await axios.get(url);
        dispatch({ type: "GET_PRODUCTS", payload: res.data });
    } catch (error) {
        console.log(error);
    }
}

