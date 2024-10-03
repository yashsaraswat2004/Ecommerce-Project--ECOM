import { Avatar, Box, Grid2, Rating } from '@mui/material'
import React from 'react'

const ProductReviewCard = () => {
    return (
        <Grid2 container spacing={2} gap={3}>
            <Grid2 item xs={1}>
                <Box>
                    <Avatar className='text-white' sx={{ width: 56, height: 56, bgcolor: "black" }}>S</Avatar>
                </Box>
            </Grid2>

            <Grid2 xs={9} item>
                <div className='space-y-2'>
                    <div>
                        <p className='font-semibold text-lg'>Subhrajit</p>
                        <p className='opacity-70'>Sep 13, 2024</p>
                    </div>
                </div>

                <Rating value={3.5} name='half-rating' readOnly precision={.1} />
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
            </Grid2>
        </Grid2>
    )
}

export default ProductReviewCard
