import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useDispatch, useSelector } from 'react-redux';
import { deleteProduct, findProducts } from '../../state/Product/Action';
import { Avatar, Button, Card, CardHeader } from '@mui/material';

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];

export default function ProductsTable() {
  const dispatch = useDispatch();
  const { products } = useSelector(store => store)

  const handleProductDelete = (productId) => {
    dispatch(deleteProduct(productId))
  }

  React.useEffect(() => {
    dispatch(findProducts({
      // category: "top",
      colors: [],
      sizes: [],
      miniPrice: 0,
      maxPrice: 1000000000,
      sort: "price_low",
      stock: "",
      pageNumber: 1,
      pageSize: 10
    }));
  }, [products.deltedProduct]);
  return (
    <div className='p-5' >
      <Card className='mt-2'>
        <CardHeader title='All products' />
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Image</TableCell>
                <TableCell align="center">Title</TableCell>
                <TableCell align="center">Category</TableCell>
                <TableCell align="center">Price</TableCell>
                <TableCell align="center">Quantity</TableCell>
                <TableCell align="center">Delete</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {products?.products?.map((row) => (
                <TableRow
                  key={row.title}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell align="center" scope="row">
                    <Avatar src={row.imageUrl} />
                  </TableCell>
                  <TableCell align="center" scope="row">
                    {row.title}
                  </TableCell>
                  <TableCell align="center">{row.category.name}</TableCell>
                  <TableCell align="center">{row.price}</TableCell>
                  <TableCell align="center">{row.quantity}</TableCell>
                  <TableCell align="center">
                    <Button onClick={() => handleProductDelete(row._id)} variant='text'>Delete</Button>
                  </TableCell>

                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>

    </div>
  );
}

