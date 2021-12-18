import { Container, Grid } from '@mui/material';
import React from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router';
import Profile from '../Profile/Profile';
const Home = () => {
    const location = useLocation();
    const navigate = useNavigate();
    if (location.pathname === '/') {
        navigate('/help')
    }
    return (
        <Container maxWidth='xl'>
            <Grid container spacing={2}>
                <Grid sx={{ display: { xs: 'none', md: 'block' } }} item xs={12} md={4}>
                    <div className="h-screen overflow-y-scroll">
                        <Profile></Profile>
                    </div>
                </Grid>
                <Grid item xs={12} md={8}>
                    <div className="px-3">
                        <Outlet></Outlet>
                    </div>
                </Grid>
            </Grid>
        </Container>
    );
};

export default Home;