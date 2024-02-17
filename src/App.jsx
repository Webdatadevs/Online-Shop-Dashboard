import { BiLeftArrow } from "react-icons/bi"; 
import { BiRightArrow } from "react-icons/bi"; 
import {React, useReducer, useState} from "react";
import { Box, useColorMode, useColorModeValue } from "@chakra-ui/react";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import { Route, Routes } from "react-router-dom";
import LayoutContent from "./components/LayoutContent";
import Categories from "./pages/CategoriesComponent/Categories";
import Product from "./pages/ProductComponent/Product";
import CreatProduct from "./pages/CreatProduct";
import CreatCategories from "./pages/CreatCategories";
import { initialState, reducer } from "./reduserApp/reducer";
import ContextApp from "./contextApp/context";



const App = () => {
    const { colorMode, toggleColorMode } = useColorMode();
    const headerBackground = useColorModeValue("dodgerblue", "dark");
 
    const [state, dispatch] = useReducer(reducer, initialState)
    const [toogleSidebar, setSidebar] = useState(false)

    return (
        <ContextApp.Provider value={{state, dispatch}}>
            <Box display={"flex"}  width={"100%"} height={"100%"} alignItems={"start"}>
                <Box position={{base:'absolute', md:'relative'}} transition={'ease-in 0.5s'} 
                    left={{base:`${toogleSidebar ? '0px' : '-280px'} `, md:'0px'}} 
                    width={"280px"} height={"100vh"} 
                    boxShadow={`1px 0px 2px ${colorMode === 'light' ? 'silver' : 'black'}`}
                    background={`${colorMode === 'light' ? 'white' : '#1A202C'}`}
                    zIndex={'999'}
                    

                    >
                    <Sidebar setSidebar={setSidebar} colorMode={colorMode}/>
                    <Box position={'absolute'} top={'70%'} left={'280px'} display={{base: 'flex', md:'none'}} 
                        background={'dodgerblue'}
                        padding={'15px'} zIndex={'2'} 
                        onClick={() => setSidebar(!toogleSidebar)}
                        cursor={'pointer'}
                        color={'white'}
                        borderBottomRightRadius={'5px'}
                        borderTopRightRadius={'5px'}
                        border={'2px solid white'}
                        >
                        {toogleSidebar ? <BiLeftArrow /> : <BiRightArrow  />}
                    </Box>
                </Box>
                <Box width={{base: '100%', md:'calc(100% - 280px)'}}>
                    <Header headerBackground={headerBackground} 
                            toggleColorModeFun={toggleColorMode} colorMode={colorMode}/>
                    <Routes>
                        <Route path="/" element={<LayoutContent />}>
                            <Route  path="/" element={<Categories  colorMode={colorMode}/>} />
                            <Route  path="/product" element={<Product colorMode={colorMode}/>} />
                            <Route  path="/creat-product"  element={<CreatProduct />}/>
                            <Route  path="/creat-categories" element={<CreatCategories colorMode={colorMode} />}/>
                        </Route>
                    </Routes>
                </Box>
            </Box>
        </ContextApp.Provider>
    );
};

export default App;
