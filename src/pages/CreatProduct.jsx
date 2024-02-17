import {
    Button,
    FormControl,
    Input,
    Box,
    Textarea,
    Select,
    useToast,
} from "@chakra-ui/react";
import React, { useContext, useEffect, useState } from "react";
import ContextApp from "../contextApp/context";
import axios from "axios";
import { getCategoriesAxiosFunction } from "../getAxios/axiosCategories";

const CreatProduct = () => {
    const toast = useToast();
    const { state, dispatch } = useContext(ContextApp);
    const [title, setTitle] = useState();
    const [price, setPrice] = useState();
    const [image, setImage] = useState();
    const [description, setDescription] = useState();
    const [categoryId, setSelect] = useState();
    const urlP = "https://online-shop-db.onrender.com/products";
    const urlC = "https://online-shop-db.onrender.com/categories";
    useEffect(() => {
        getCategoriesAxiosFunction(urlC, dispatch);
    }, []);

    const creatProductFunction = (e) => {
        e.preventDefault();
        const data = { title, price, image, description, categoryId };
        axios
            .post(urlP, data)
            .then(() =>
                toast({
                    title: "Product created.",
                    description: "Product successfully created",
                    status: "success",
                    duration: 2000,
                    isClosable: true,
                    position: "top-right",
                })
            )
            .catch(() =>
                toast({
                    title: "Error",
                    // description: "Product successfully created",
                    status: "error",
                    duration: 2000,
                    isClosable: true,
                    position: "top-right",
                })
            );
        setTitle("");
        setImage("");
        setPrice("");
        setSelect("");
        setDescription("");
    };
    return (
        <>
            <form onSubmit={(e) => creatProductFunction(e)}>
                <Box display={"flex"} flexDirection={"column"} gap={"15px"}>
                    <FormControl>
                        <Input
                            required
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            border={"2px solid silver"}
                            placeholder={"Enter your product name"}
                        />
                    </FormControl>
                    <FormControl>
                        <Input
                            required
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            border={"2px solid silver"}
                            type={"number"}
                            placeholder={"Enter your product  price"}
                        />
                    </FormControl>
                    <FormControl>
                        <Input
                            required
                            value={image}
                            onChange={(e) => setImage(e.target.value)}
                            border={"2px solid silver"}
                            type={"url"}
                            placeholder={"Enter your product image"}
                        />
                    </FormControl>
                    <FormControl>
                        <Textarea
                            required
                            onChange={(e) => setDescription(e.target.value)}
                            value={description}
                            resize={"none"}
                            border={"2px solid silver"}
                        />
                    </FormControl>
                    <Select
                        required
                        border={"2px solid silver"}
                        onChange={(e) => setSelect(e.target.value)}
                    >
                        {state.categories.map((element) => (
                            <option
                                required
                                key={element.id}
                                value={element.id}
                            >
                                {element.title}
                            </option>
                        ))}
                    </Select>
                    <Button
                        type={"submit"}
                        color={"white"}
                        _active={{ opacity: "0.5" }}
                        _hover={{ background: "dodgerblue" }}
                        backgroundColor={"dodgerblue"}
                    >
                        SUBMIT
                    </Button>
                </Box>
            </form>
        </>
    );
};

export default CreatProduct;
