import { Grid } from '@mui/material'
import React from 'react'
import Achivement from './Achivement'
import MonthlyOverView from './MonthlyOverView'
import ProductsTable from './ProductsTable'
import OrdersTable from './OrdersTable'

const AdminDashbord = () => {
    return (
        <div className='p-10'>
            <Grid container spacing={2}>
                <Grid md={4} item xs={12}>
                    <Achivement />
                </Grid>

                <Grid item xs={12} md={8}>
                    <MonthlyOverView />
                </Grid>
                <Grid item xs={12} md={8}>
                    <ProductsTable />
                </Grid>
                <Grid item xs={12} md={8}>
                    <OrdersTable />
                </Grid>
            </Grid>
        </div>
    )
}

export default AdminDashbord
