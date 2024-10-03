import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { confirmOrder, deliveredOrder, delteOrder, getOrder, outForDelivery, shipOrder } from '../../state/Admin/Order/Action';
import { Avatar, AvatarGroup, Button, Card, CardHeader, Menu, MenuItem, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';

const OrdersTable = () => {
  const [anchorEl, setAnchorEl] = React.useState([]);
  const dispatch = useDispatch();
  const { admin } = useSelector(store => store);

  useEffect(() => {
    dispatch(getOrder());
  }, [dispatch]);

  const handleClick = (event, index) => {
    const newAnchorElArray = [...anchorEl];
    newAnchorElArray[index] = event.currentTarget;
    setAnchorEl(newAnchorElArray);
  };

  const handleClose = (index) => {
    const newAnchorElArray = [...anchorEl];
    newAnchorElArray[index] = null;
    setAnchorEl(newAnchorElArray);
  };

  const handleConfirmedOrder = (orderId, index) => {
    dispatch(confirmOrder(orderId));
    handleClose(index); // Close the menu after confirming the order
  };

  const handleShippedOrder = (orderId, index) => {
    dispatch(shipOrder(orderId));
    handleClose(index); // Close the menu after shipping the order
  };

  const handleDeliveredOrder = (orderId, index) => {
    dispatch(deliveredOrder(orderId));
    handleClose(index); // Close the menu after delivering the order
  };

  const handleDeleteOrder = (orderId) => {
    dispatch(delteOrder(orderId));
  };

  return (
    <div className='p-10'>
      <Card className='mt-2'>
        <CardHeader title='All Orders' />
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Image</TableCell>
                <TableCell align="center">Title</TableCell>
                <TableCell align="center">ID</TableCell>
                <TableCell align="center">Price</TableCell>
                <TableCell align="center">Status</TableCell>
                <TableCell align="center">Change Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {admin.orders?.map((row, index) => (
                <TableRow key={row._id}>
                  <TableCell>
                    <AvatarGroup max={3} sx={{ justifyContent: "start" }} >
                      {row.orderItems?.map((orderItem) => <Avatar key={orderItem.product._id} src={orderItem.product[0]?.imageUrl} />)}
                    </AvatarGroup>
                  </TableCell>
                  <TableCell align="center">
                    {row.orderItems?.map((orderItem) => <p key={orderItem.product._id}>{orderItem.product[0]?.title}</p>)}
                  </TableCell>
                  <TableCell align="center">{row._id}</TableCell>
                  <TableCell align="center">{row.totalPrice}</TableCell>
                  <TableCell align="center">
                    <span className={`text-white px-5 py-5 rounded-full ${getStatusClass(row.orderStatus)}`}>
                      {row.orderStatus}
                    </span>
                  </TableCell>
                  <TableCell align="center">
                    <Button onClick={(event) => handleClick(event, index)}>Change Status</Button>
                    <Menu
                      anchorEl={anchorEl[index]}
                      open={Boolean(anchorEl[index])}
                      onClose={() => handleClose(index)}
                    >
                      <MenuItem onClick={() => handleConfirmedOrder(row._id, index)}>Confirm Order</MenuItem>
                      <MenuItem onClick={() => handleShippedOrder(row._id, index)}>Ship Order</MenuItem>
                      <MenuItem onClick={() => handleDeliveredOrder(row._id, index)}>Delivered Order</MenuItem>
                    </Menu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>

      
    </div>
  );
};

const getStatusClass = (status) => {
  switch (status) {
    case "CONFIRMED": return "bg-[#369236]";
    case "SHIPPED": return "bg-[#4141ff]";
    case "PLACED": return "bg-[#02B290]";
    case "PENDING": return "bg-[gray]";
    default: return "bg-[#025720]";
  }
};

export default OrdersTable;
