import { Box, Button, FormControl, Input, useToast } from "@chakra-ui/react";
import axios from "axios";
import React, { useState } from "react";

const CreatCategories = ({ colorMode }) => {
    const [title, setTitle] = useState("");
    const [image, setImage] = useState("");
    const toast = useToast();
    const url = "https://online-shop-db.onrender.com/categories";

    const creatCategoriesFunction = (e) => {
        e.preventDefault();
        const data = { title, image };
        axios
            .post(url, data)
            .then(() =>
                toast({
                    title: "Category created.",
                    description: "Category successfully created",
                    status: "success",
                    duration: 2000,
                    isClosable: true,
                    position: "top-right",
                })
            )
            .catch(() =>
                toast({
                    title: "Error",
                    // description: "Category successfully created",
                    status: "error",
                    duration: 2000,
                    isClosable: true,
                    position: "top-right",
                })
            );
        setTitle("");
        setImage("");
    };
    return (
        <>
            <form onSubmit={(e) => creatCategoriesFunction(e)}>
                <Box display={"flex"} flexDirection={"column"} gap={"15px"}>
                    <FormControl>
                        <Input
                            required
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            border={"2px solid silver"}
                            placeholder={"Enter your category name"}
                        />
                    </FormControl>
                    <FormControl>
                        <Input
                            required
                            value={image}
                            onChange={(e) => setImage(e.target.value)}
                            border={"2px solid silver"}
                            placeholder={"Enter your category image url"}
                        />
                    </FormControl>
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

export default CreatCategories;
