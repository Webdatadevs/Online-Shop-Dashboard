import React, { useContext, useEffect, useState } from "react";
import { Box, Button, Img, useDisclosure, useToast } from "@chakra-ui/react";
import { Text } from "@chakra-ui/react";
import ContextApp from "../../contextApp/context";
import {
    AlertDialog,
    AlertDialogOverlay,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogBody,
    AlertDialogFooter,
} from "@chakra-ui/react";
import axios from "axios";
import {
    getCategoriesAxiosFunction,
    getProductsAxiosFunction,
} from "../../getAxios/axiosCategories";
import UpdateCategory from "./UpdateCategory";
const CategoriesCard = ({ colorMode }) => {
    const {
        isOpen: isOpenUpdate,
        onOpen: onOpenUpdate,
        onClose: onClouseUpdate,
    } = useDisclosure();

    const { isOpen, onOpen, onClose } = useDisclosure();
    const cancelRef = React.useRef();

    const toast = useToast();

    const { state, dispatch } = useContext(ContextApp);
    const [id, setId] = useState();
    const url = "https://online-shop-db.onrender.com/categories";

    const [updateId, setUpdateId] = useState();
    function updateCategoryFunction(id) {
        setUpdateId(id)
        onOpenUpdate();
    }

    async function deleteProductsIdNull(){
        const data = await axios.get('https://online-shop-db.onrender.com/products')
        for(iterator of data.products){
            if(!iterator.categoryId){
                await axios.delete('https://online-shop-db.onrender.com/products', iterator)
            }
        }
    }

    const selectId = (id) => {
        setId(id);
        onOpen();
    };

    const deletCategoryFunction = async () => {
        await axios
            .delete(`https://online-shop-db.onrender.com/categories/${id}`)
            .then(() =>
                toast({
                    title: "Category deleted.",
                    description: "Category successfully deleted",
                    status: "success",
                    duration: 2000,
                    isClosable: true,
                    position: "top-right",
                }),
                deleteProductsIdNull()
            )
            .catch(() =>
                toast({
                    title: "Error",
                    // description: "Error",
                    status: "error",
                    duration: 2000,
                    isClosable: true,
                    position: "top-right",
                })
            );
        getCategoriesAxiosFunction(url, dispatch);
        onClose();
    };

    useEffect(() => {
        getProductsAxiosFunction(url, dispatch);
    }, []);

    return (
        <>
            {state.categories.map((element) => (
                <Box
                    key={element.id}
                    cursor={"pointer"}
                    display={"flex"}
                    flexDirection={"column"}
                    alignItems={"center"}
                    justifyContent={"flex-start"}
                    borderRadius={"10px"}
                    backgroundColor={`${
                        colorMode === "dark" ? "" : "dodgerblue"
                    }`}
                    padding={"10px"}
                    gap={"15px"}
                    border={`${
                        colorMode === "dark" ? "1px solid dodgerblue" : ""
                    }`}
                >
                    <Box
                        overflow={"hidden"}
                        height={"100%"}
                        borderRadius={"10px"}
                    >
                        <Img
                            transition={"all 0.8s"}
                            _hover={{ transform: "scale(1.1)" }}
                            width={"100%"}
                            height={"100%"}
                            src={element.image}
                            borderRadius={"10px"}
                        />
                    </Box>
                    <Text color={"white"} fontSize={"24px"}>
                        {element.title}
                    </Text>

                    <Box
                        width={"100%"}
                        display={"flex"}
                        justifyContent={"space-between"}
                        paddingX={"30px"}
                    >
                        <Button
                            _active={{ opacity: "0.5" }}
                            backgroundColor={`${
                                colorMode === "dark" ? "dodgerblue" : "white"
                            }`}
                            color={`${
                                colorMode === "dark" ? "white" : "dodgerblue"
                            }`}
                            _hover={{ backgroundColor: "" }}
                            onClick={() => updateCategoryFunction(element.id)}
                        >
                            UPDATE
                        </Button>
                        <Button
                            onClick={() => selectId(element.id)}
                            _active={{ opacity: "0.5" }}
                            backgroundColor={"crimson"}
                            color={"white"}
                            _hover={{ backgroundColor: "crimson" }}
                        >
                            DELETE
                        </Button>
                    </Box>
                </Box>
            ))}
            <UpdateCategory
                isOpenUpdate={isOpenUpdate}
                onOpenUpdate={onOpenUpdate}
                onClouseUpdate={onClouseUpdate}
                updateId={updateId}
            />
            <AlertDialog
                isOpen={isOpen}
                leastDestructiveRef={cancelRef}
                onClose={onClose}
            >
                <AlertDialogOverlay>
                    <AlertDialogContent>
                        <AlertDialogHeader fontSize="lg" fontWeight="bold">
                            Delete Customer
                        </AlertDialogHeader>

                        <AlertDialogBody>
                            Are you sure? You can't undo this action afterwards.
                        </AlertDialogBody>

                        <AlertDialogFooter>
                            <Button ref={cancelRef} onClick={onClose}>
                                Cancel
                            </Button>
                            <Button
                                colorScheme="red"
                                onClick={() => deletCategoryFunction()}
                                ml={3}
                            >
                                Delete
                            </Button>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialogOverlay>
            </AlertDialog>
        </>
    );
};

export default CategoriesCard;
