import { Box } from "@chakra-ui/react";
import React from "react";
import { Outlet } from "react-router-dom";


const LayoutContent = () => {
    return (
        <>
            <Box height={"88vh"} overflowY={"auto"} padding={"15px 20px"}>
                {/* <FormContent /> */}
                <Box
                    width={"100%"}
                    display={"grid"}
                    gridTemplateColumns={
                        "repeat(auto-fill, minmax(350px, 1fr))"
                    }
                    gap={"20px"}
                >
                    <Outlet />
                </Box>
            </Box>
        </>
    );
};

export default LayoutContent;
