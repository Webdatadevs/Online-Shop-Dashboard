import {
    FormControl,
    FormLabel,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Button,
    Input,
    useToast,
    Textarea,
    Select,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { getCategoriesAxiosFunction, getProductsAxiosFunction } from "../../getAxios/axiosCategories";
import ContextApp from "../../contextApp/context";
const UpdateProduct = ({
    isOpenUpdate,
    onOpenUpdate,
    onClouseUpdate,
    UpdateProductId,
}) => {
    const { state, dispatch } = useContext(ContextApp);
    const initialRef = React.useRef(null);
    const finalRef = React.useRef(null);

    const toast = useToast();

    const [title, setTitle] = useState("");
    const [image, setImage] = useState("");
    const [price, setPrice] = useState("");
    const [description, setDescription] = useState("");
    const [select, setSelect] = useState();

    const url = "https://online-shop-db.onrender.com/products";

    useEffect(() => {
        setTitle(`${state.products?.find((element) => (element.id === UpdateProductId))?.title}`);
        setImage(`${state.products?.find((element) => (element.id === UpdateProductId))?.image}`);
        setPrice(`${state.products?.find((element) => (element.id === UpdateProductId))?.price}`);
        setDescription(`${state.products?.find((element) => (element.id === UpdateProductId))?.description}`);
        setSelect(`${state.products?.find((element) => (element.id === UpdateProductId))?.categoryId}`);
    }, [UpdateProductId]);

    async function updateProduct(id) {
        await axios
            .put(`${url}/${id}`, {
                title: title,
                image: image,
                price: price,
                description: description,
                categoryId: select,
                
            })
            .then(() =>
                toast({
                    title: "Product added.",
                    description: "Product successfully added",
                    status: "success",
                    duration: 3000,
                    isClosable: true,
                    position: "top-right",
                })
            )
            .catch(() =>
                toast({
                    title: "Error",
                    description: "Product successfully added",
                    status: "error",
                    duration: 3000,
                    isClosable: true,
                    position: "top-right",
                })
            );
        getProductsAxiosFunction(url, dispatch);
        // setTitle("");
        // setImage("");
        // setPrice("");
        // setDescription("");
        onClouseUpdate();
    }

    useEffect(()=>{
        getCategoriesAxiosFunction('https://online-shop-db.onrender.com/categories', dispatch);
    }, [])
    return (
        <>
            <Modal
                initialFocusRef={initialRef}
                finalFocusRef={finalRef}
                isOpen={isOpenUpdate}
                onClose={onClouseUpdate}
            >
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Update category</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                        <FormControl>
                            <FormLabel>Products name</FormLabel>
                            <Input
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                ref={initialRef}
                                placeholder="Category name"
                            />
                        </FormControl>

                        <FormControl mt={4}>
                            <FormLabel>Product image</FormLabel>
                            <Input
                                value={image}
                                onChange={(e) => setImage(e.target.value)}
                                type={"url"}
                                placeholder="Category image"
                            />
                        </FormControl>

                        <FormControl mt={4}>
                            <FormLabel>Product price</FormLabel>
                            <Input
                                required
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                                type={"number"}
                                placeholder="Product price"
                            />
                        </FormControl>
                        <FormControl mt={4}>
                            <FormLabel>Product description</FormLabel>
                            <Textarea
                                required
                                resize={"none"}
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                placeholder="Product description"
                            />
                        </FormControl>
                        <Select
                            mt={4}
                            required
                            border={"2px solid silver"}
                            onChange={(e) => setSelect(e.target.value)}
                            >
                            {state.categories.map((item) => (
                                <option
                                    required
                                    key={item.id}
                                    value={item.id}
                                >
                                    {item.title}
                                </option>
                            ))}
                        </Select>
                    </ModalBody>

                    <ModalFooter>
                        <Button
                            onClick={() => updateProduct(UpdateProductId)}
                            backgroundColor={"dodgerblue"}
                            color={"white"}
                            _hover={{ backgroundColor: "none" }}
                            _active={{ opacity: "0.5" }}
                            mr={3}
                        >
                            Save
                        </Button>
                        <Button
                            onClick={onClouseUpdate}
                            backgroundColor={"crimson"}
                            color={"white"}
                            _hover={{ backgroundColor: "none" }}
                            _active={{ opacity: "0.5" }}
                        >
                            Cancel
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
};
export default UpdateProduct;