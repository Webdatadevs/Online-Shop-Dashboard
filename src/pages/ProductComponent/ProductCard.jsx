import { BsFillTrash3Fill } from "react-icons/bs";
import { Box, Img, Text, Button, useToast } from "@chakra-ui/react";
import React, { useContext, useState } from "react";
import { BiPencil } from "react-icons/bi";
import { useDisclosure } from "@chakra-ui/react";
import {
    AlertDialog,
    AlertDialogOverlay,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogBody,
    AlertDialogFooter,
} from "@chakra-ui/react";
import ContextApp from "../../contextApp/context";
import axios from "axios";
import {
    getCategoriesAxiosFunction,
    getProductsAxiosFunction,
} from "../../getAxios/axiosCategories";
import UpdateProduct from "./UpdateProduct";

const ProductCard = ({ colorMode, load }) => {
    const toast = useToast();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const cancelRef = React.useRef();
    const { state, dispatch } = useContext(ContextApp);
    const [idProduct, setIdProduct] = useState();
    
    const {
        isOpen: isOpenUpdate,
        onOpen: onOpenUpdate,
        onClose: onClouseUpdate,
    } = useDisclosure();

    const [UpdateProductId, setUpdate] = useState();

    const url = "https://online-shop-db.onrender.com/products";

    function selectId(id) {
        setIdProduct(id);
        onOpen();
    }

    function updateProductFunction(id) {
        setUpdate(id);
        onOpenUpdate();
    }
    async function handleDeleteProduct(){
        await axios
            .delete(`https://online-shop-db.onrender.com/products/${idProduct}`)
            .then(() =>
                toast({
                    title: "Product deleted.",
                    description: "Product successfully deleted",
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
        onClose();
        getProductsAxiosFunction(url, dispatch);
        getCategoriesAxiosFunction('https://online-shop-db.onrender.com/categories', dispatch);
    };

    return (
        <>
            <Box
                fontSize={"24px"}
                display={`${
                    load && state.products.length == 0 ? "block" : "none"
                }`}
            >
                Loading....
            </Box>
            {state.products.map((element) => (
                <Box
                    key={element.id}
                    cursor={"pointer"}
                    display={"flex"}
                    justifyContent={"flex-end"}
                    flexDirection={"column"}
                    alignItems={"center"}
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
                        position={"relative"}
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
                            objectFit={"cover"}
                            borderRadius={"10px"}
                        />
                        <Text
                            display={"flex"}
                            justifyContent={"center"}
                            alignItems={"center"}
                            backgroundColor={"blackAlpha.700"}
                            padding={"5px"}
                            color={"white"}
                            position={"absolute"}
                            top={"10px"}
                            left={"10px"}
                        >
                            {
                                state.categories?.find(
                                    (item) => item.id == element.categoryId
                                )?.title
                            }
                        </Text>
                    </Box>
                    <Box
                        display={"flex"}
                        flexDirection={"column"}
                        alignItems={"center"}
                        justifyContent={"flex-end"}
                    >
                        <Text color={"white"} fontSize={"24px"}>
                            {element.title}
                        </Text>
                        <Text color={"white"} fontSize={"18px"}>
                            {element.price}
                            {" $"}
                        </Text>
                    </Box>
                    <Box
                        display={"flex"}
                        alignItems={"center"}
                        justifyContent={"space-between"}
                        width={"100%"}
                        paddingX={"20px"}
                    >
                        <Button
                             color={`${colorMode === 'light' ? 'dodgerblue' : 'white'}`}
                            _hover={{background: ''}}
                            _active={{opacity:'0.5'}}
                            backgroundColor={`${
                                colorMode === "light" ? "white" : "dodgerblue"
                            }`}
                            display={"flex"}
                            justifyContent={"center"}
                            alignItems={"center"}
                            gap={'10px'}
                            border={`${
                                colorMode === "light"
                                    ? ""
                                    : "1px solid dodgerblue"
                            }`}
                            onClick={() => updateProductFunction(element.id)}
                        >
                            UPDATE
                            <BiPencil
                                color={`${
                                    colorMode === "light"
                                        ? "dodgerblue"
                                        : "white"
                                }`}
                            />
                        </Button>
                        <Button
                             color={`${colorMode === 'light' ? 'dodgerblue' : 'white'}`}
                            _hover={{background: ''}}
                            _active={{opacity:'0.5'}}
                            backgroundColor={`${
                                colorMode === "light" ? "white" : "dodgerblue"
                            }`}
                            display={"flex"}
                            justifyContent={"center"}
                            alignItems={"center"}
                            border={`${
                                colorMode === "light"
                                    ? ""
                                    : "1px solid dodgerblue"
                            }`}
                            gap={'10px'}
                            onClick={() => {
                                selectId(element.id);
                            }}
                        >
                            DELETE
                            <BsFillTrash3Fill color={"crimson"} />
                        </Button>
                    </Box>
                </Box>
            ))}
            <UpdateProduct
                UpdateProductId={UpdateProductId}
                isOpenUpdate={isOpenUpdate}
                onOpenUpdate={onOpenUpdate}
                onClouseUpdate={onClouseUpdate}
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
                                onClick={() => {
                                    handleDeleteProduct();
                                }}
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

export default ProductCard;
