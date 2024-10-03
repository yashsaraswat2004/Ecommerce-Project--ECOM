import React, { useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { confirmOrder, deliveredOrder, delteOrder, getOrder, shipOrder } from '../../state/Admin/Order/Action';
import { Avatar, AvatarGroup, Button, Card, CardHeader, Menu, MenuItem, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';

const OrdersTable = () => {
    const [anchorEl, setAnchorEl] = React.useState([]);
    const open = Boolean(anchorEl);


    const handleClick = (event, index) => {
        const newAchorElArray = [...anchorEl]
        newAchorElArray[index] = event.currentTarget
        setAnchorEl(newAchorElArray);
    };
    const handleClose = (index) => {
        const newAchorElArray = [...anchorEl]
        newAchorElArray[index] = null
        setAnchorEl(newAchorElArray);
    };

    const dispatch = useDispatch();
    const { admin } = useSelector(store => store)
    useEffect(() => {
        dispatch(getOrder())
    }, [admin.confirmed, admin.shipped, admin.delivered, admin.deletedOrder])



    return (
        <div className='p-10' >
            <Card className='mt-2'>
                <CardHeader title='All products' />
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Image</TableCell>
                                <TableCell align="center">Title</TableCell>
                                <TableCell align="center">ID</TableCell>
                                <TableCell align="center">Price</TableCell>
                                <TableCell align="center">Status</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {admin.orders?.map((row, index) => (
                                <TableRow
                                    key={row.title}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell align="" scope="">
                                        <AvatarGroup max={3} sx={{ justifyContent: "start" }} >
                                            {row.orderItems?.map((orderItem) => <Avatar src={orderItem.product.imageUrl} />)}
                                        </AvatarGroup>
                                    </TableCell>

                                    <TableCell align="center" scope="row">
                                        {row.orderItems?.map((orderItem) => <p>{orderItem.product.title}</p>)}
                                    </TableCell>
                                    <TableCell align="center">{row._id}</TableCell>
                                    <TableCell align="center">{row.totalPrice}</TableCell>
                                    <TableCell align="center">
                                        <span
                                            className={`text-white px-5 py-5 rounded-full
                      ${row.orderStatus === "CONFIRMED" ? "bg-[#369236]" :
                                                    row.orderStatus === "SHIPPED" ? "bg-[#4141ff]" :
                                                        row.orderStatus === "PLACED" ? "bg-[#02B290]" :
                                                            row.orderStatus === "PENDING" ? "bg-[gray]" :
                                                                "bg-[#025720]"}`}
                                        >
                                            {row.orderStatus}
                                        </span>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Card>
        </div>
    )
}

export default OrdersTable
