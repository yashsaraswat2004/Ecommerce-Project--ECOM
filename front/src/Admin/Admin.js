import React, { useState } from 'react';
import useMediaQuery from '@mui/material/useMediaQuery';
import { Route, Routes, useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import { CssBaseline, List, ListItem, ListItemButton, ListItemIcon, ListItemText, useTheme } from '@mui/material';
import DashboardCustomizeIcon from '@mui/icons-material/DashboardCustomize';
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined';
import SupportAgentOutlinedIcon from '@mui/icons-material/SupportAgentOutlined';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import CreateProductForm from './Components/CreateProductForm';
import ProductsTable from './Components/ProductsTable';
import OrdersTable from './Components/OrdersTable';
import CustomersTables from './Components/CustomersTables';
import AdminDashbord from './Components/Dashbord';

// Menu Configuration
const menu = [
    { name: "Dashboard", path: "/admin", icon: <DashboardCustomizeIcon /> },
    { name: "Products", path: "/admin/products", icon: <Inventory2OutlinedIcon /> },
    { name: "Customer", path: "/admin/customers", icon: <SupportAgentOutlinedIcon /> },
    { name: "Orders", path: "/admin/orders", icon: <Inventory2OutlinedIcon /> },
    { name: "AddProduct", path: "/admin/product/create", icon: <AddCircleOutlineOutlinedIcon /> },
    { name: "", path: "" },
];

const Admin = () => {
    const theme = useTheme();
    const isLargeScreen = useMediaQuery(theme.breakpoints.up("lg"));
    const [sideBarVisible, setSideBarVisible] = useState(false);
    const navigate = useNavigate();

    const drawer = (
        <Box
            sx={{
                overflow: "auto",
                flexDirection: "column",
                justifyContent: "space-between",
                display: "flex",
                height: "100%"
            }}
        >
            <List>
                {menu.map((item, index) => item.name && (
                    <ListItem key={index} disablePadding>
                        <ListItemButton onClick={() => navigate(item.path)}>
                            <ListItemIcon>
                                {item.icon}
                            </ListItemIcon>
                            <ListItemText primary={item.name} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>

            <List>
                <ListItem disablePadding>
                    <ListItemButton>
                        <ListItemIcon>
                            <AccountCircleOutlinedIcon />
                        </ListItemIcon>
                        <ListItemText primary="Accounts" />
                    </ListItemButton>
                </ListItem>
            </List>
        </Box>
    );

    return (
        <div>
            <div className="flex h-[100vh] ">
                <CssBaseline />
                <div className='w-[15%] border border-r-gray-300 h-full'>{drawer}</div>

                <div className='w-[85%]'>
                    <Routes>
                        <Route path="/" element={<AdminDashbord />} />
                        <Route path="/product/create" element={<CreateProductForm />} />
                        <Route path="/products" element={<ProductsTable />} />
                        <Route path="/orders" element={<OrdersTable />} />
                        <Route path="/customers" element={<CustomersTables />} />
                    </Routes>
                </div>
            </div>
        </div>
    );
};

export default Admin;
