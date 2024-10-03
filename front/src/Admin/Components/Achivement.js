import { Button, Card, CardContent, styled, Typography } from '@mui/material'
import React from 'react'


const TriangleImage = styled("img")({
    right: 0,
    bottom: 0,
    height: 170,
    position: 'absolute'
})

const TrophyImage = styled("img")({
    right: 36,
    bottom: 20,
    height: 98,
    position: 'absolute'
})

const Achivement = () => {
    return (
        <>
            <Card className='space-y-5' sx={{ position: "relative" }} >
                <CardContent>
                    <Typography variant='h6' sx={{ letterSpacing: '.25px' }} >
                        Ecom
                    </Typography>
                    <Typography variant='body2' >Congratulations 😁</Typography>
                    <Typography variant='h5' sx={{ my: 3.1 }} >428.4K</Typography>

                    <Button size='small' variant='contained'>View Sales</Button>

                    <TriangleImage src=''></TriangleImage>
                    <TrophyImage src='https://media.istockphoto.com/id/1168757141/vector/gold-trophy-with-the-name-plate-of-the-winner-of-the-competition.jpg?s=612x612&w=0&k=20&c=ljsP4p0yuJnh4f5jE2VwXfjs96CC0x4zj8CHUoMo39E=' />
                </CardContent>
            </Card>
        </>
    )
}

export default Achivement
