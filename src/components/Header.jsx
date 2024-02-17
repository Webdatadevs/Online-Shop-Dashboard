import { BiSun } from "react-icons/bi";
import { AiOutlineSearch } from "react-icons/ai";
import { BiMoon } from "react-icons/bi";
import { Box, Icon, IconButton, Input, InputGroup, InputRightElement,} from "@chakra-ui/react";
import { Text } from "@chakra-ui/react";
import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import buttonData from "../config/constants";

const Header = ({ headerBackground, toggleColorModeFun, colorMode }) => {
    const {pathname} = useLocation()
    return (
        <Box display={"flex"} justifyContent={"space-between"} alignItems={"center"}  position={"sticky"} top={"0px"}
        width={"100%"}  padding={{base:'10px', md:'20px'}} backgroundColor={headerBackground} gap={'20px'}>
            <Box display={"flex"} alignItems={"center"} gap={"10px"}>
                <Box cursor={'pointer'}   display={"flex"} alignItems={"center"} 
                   justifyContent={"center"}  
                   padding={"10px"} 
                   backgroundColor={`${colorMode === 'light' ? 'white' : 'dodgerblue'}`}
                   borderRadius={"full"}
                    >
                    <Icon as={ buttonData.find((element) => element.path === pathname).icon } 
                    color={`${colorMode === 'light' ? 'dodgerblue' : 'white'}`} fontSize={{base:"14px"}} />
                </Box>
                <Text fontSize={{base:'14px', md:'24px'}} color={"white"}>
                    {
                        buttonData.find((element) => element.path === pathname).name
                    }
                </Text>
            </Box>

            <Box display={'flex'} width={'md'}  alignItems={'center'} justifyContent={'center'} gap={'10px'}>
                <InputGroup >
                        <Input width={"100%"} placeholder={"Serach"} border={"1px solid white"} color={"white"} 
                            focusBorderColor={"white"}
                            _placeholder={{ color: "white", fontSize:'14px' }}/>
                    <InputRightElement>
                        <IconButton  background={"white"} color={"dodgerblue"} borderTopLeftRadius={"0px"} 
                            borderBottomLeftRadius={"0px"}
                            icon={<AiOutlineSearch />}/>
                    </InputRightElement>
                </InputGroup>
                <Box>
                    <IconButton borderRadius={"full"} background={"white"} color={"dodgerblue"}
                            icon={colorMode === "light" ? <BiMoon /> : <BiSun />}
                            onClick={() => toggleColorModeFun()}/>
                </Box>
            </Box>
        </Box>
    );
};

export default Header;
