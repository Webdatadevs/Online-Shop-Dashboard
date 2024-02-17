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
} from "@chakra-ui/react";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { getCategoriesAxiosFunction } from "../../getAxios/axiosCategories";
import ContextApp from "../../contextApp/context";
const UpdateCategory = ({
    isOpenUpdate,
    onOpenUpdate,
    onClouseUpdate,
    updateId,
}) => {
    const { state, dispatch } = useContext(ContextApp);
    const initialRef = React.useRef(null);
    const finalRef = React.useRef(null);

    const toast = useToast();

    const [title, setTitle] = useState("");
    const [image, setImage] = useState("");
    const url = "https://online-shop-db.onrender.com/categories";

    useEffect(() => {
        setTitle(`${state.categories?.find((element) => (element.id === updateId))?.title}`);
        setImage(`${state.categories?.find((element) => (element.id === updateId))?.image}`);
    }, [updateId]);

    async function updateCategory(id) {
        await axios
            .put(`${url}/${id}`, {
                title: title,
                image: image,
            })
            .then(() =>
                toast({
                    title: "Category added.",
                    description: "Category successfully added",
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
        // setTitle("");
        // setImage("");
        onClouseUpdate();
        getCategoriesAxiosFunction(url, dispatch);
    }
    
    return (
        <>
            <Modal
                initialFocusRef={initialRef}
                finalFocusRef={finalRef}
                isOpen={isOpenUpdate}
                onClose={onClouseUpdate}
                marginX={'5px'}
            >
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Update category</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                        <FormControl>
                            <FormLabel>Category name</FormLabel>
                            <Input
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                ref={initialRef}
                                placeholder="Category name"
                            />
                        </FormControl>

                        <FormControl mt={4}>
                            <FormLabel>Category image</FormLabel>
                            <Input
                                value={image}
                                onChange={(e) => setImage(e.target.value)}
                                type={"url"}
                                placeholder="Category image"
                            />
                        </FormControl>
                    </ModalBody>

                    <ModalFooter>
                        <Button
                            onClick={() => updateCategory(updateId)}
                            colorScheme="blue"
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

export default UpdateCategory;
