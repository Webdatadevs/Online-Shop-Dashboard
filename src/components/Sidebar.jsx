import { RxDashboard } from "react-icons/rx"; 
import { Box, Button, Icon, Text } from "@chakra-ui/react";
import React from "react";
import buttonData from "../config/constants";
import { NavLink } from "react-router-dom";
import "./Sidebar.css";
const Sidebar = ({colorMode, setSidebar}) => {
    return (
        <Box height={"100vh"} display={'flex'} flexDirection={"column"} alignItems={"center"} gap={"150px"} >
            <Text display={'flex'} alignItems={'center'} gap={'10px'} padding={"25px"} fontSize={"24px"} 
                color={`${colorMode === 'light'? 'dodgerblue' : 'white'}`}>
                <RxDashboard />
                DASHBOARD
            </Text>
            <Box display={"flex"} justifyContent={"center"} flexDirection={"column"} gap={"15px"} width={"100%"} 
                paddingX={"15px"}>
                {
                buttonData.map((element, index) => (
                    <NavLink to={element.path} key={index}>
                        <Button onClick={() => setSidebar(false)} _hover={{background:' dodgeblue'}} width={"100%"} display={"flex"} 
                            justifyContent={"start"} alignItems={'center'} gap={"10px"} padding={'25px'} 
                            boxShadow={`${colorMode === 'dark' ? '' : '2px 2px 3px silver'}`}
                            color={`${colorMode === 'light'? 'dodgerblue' : 'white'}`}>
                            <Icon as={element.icon} fontSize={'16px'} />
                            <Text fontSize={"14px"} fontWeight={'500'} >{element.name}</Text>
                        </Button>
                    </NavLink>
                ))
                }
            </Box>
        </Box>
    );
};

export default Sidebar;
