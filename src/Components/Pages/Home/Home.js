import { Container, Grid } from '@mui/material';
import React from 'react';
import { Outlet, } from 'react-router';
import Profile from '../Profile/Profile';
const Home = () => {
    return (
        <Container maxWidth='lg'>
            <Grid container spacing={1}>
                <Grid sx={{ display: { xs: 'none', md: 'block' } }} item xs={12} md={3}>
                    <div className="h-screen overflow-y-scroll">
                        <Profile></Profile>
                    </div>
                </Grid>
                <Grid item xs={12} md={7}>
                    <div >
                        <Outlet></Outlet>
                    </div>
                </Grid>
                <Grid item xs={12} md={2}>
                    <div className="px-3">
                    </div>
                </Grid>
            </Grid>
        </Container>
    );
};

export default Home;