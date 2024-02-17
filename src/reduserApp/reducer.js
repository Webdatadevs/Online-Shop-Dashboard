export const initialState = {
    categories: [],
    products: [],
    isLoadingCategories: false,
    isLoadingProducts: false,
    creatProductsLoading: false,
};

export function reducer(state, action) {
    switch (action.type) {
        case "LOADING_CATEGORIES":
            return {
                ...state,
                isLoadingCategories: true,
            };
        case "GET_CATEGORIES":
            return {
                ...state,
                categories: action.payload,
                isLoadingCategories: false,
            };
        case "LOADING_PRODUCTS":
            return {
                ...state,
                isLoadingProducts: true,
            };
        case "GET_PRODUCTS":
            return {
                ...state,
                products: action.payload,
                isLoadingProducts: false,
            };
        default:
            return state;
    }
}
