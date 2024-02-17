import { BiCategory } from "react-icons/bi";
import { FcAddDatabase } from "react-icons/fc";
import { HiOutlineViewGridAdd } from "react-icons/hi";
import { SlBasket } from "react-icons/sl";
const buttonData = [
    {
        id: 1,
        icon: BiCategory,
        name: "CATEGORIES",
        path: '/'
    },
    {
        id: 2,
        icon: SlBasket,
        name: "PRODUCTS",
        path: '/product'
    },
    {
        id: 3,
        icon: FcAddDatabase,
        name: "CREAT PRODUCTS",
        path:'/creat-product'
    },
    {
        id: 4,
        icon:HiOutlineViewGridAdd,
        name: "CREAT CATEGORIES",
        path: '/creat-categories'
    },
];

export default buttonData;
