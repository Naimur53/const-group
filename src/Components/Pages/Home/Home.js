import { Container, Grid } from '@mui/material';
import React from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router';
import Profile from '../Profile/Profile';
const Home = () => {
    const location = useLocation();
    const navigate = useNavigate();
    return (
        <Container maxWidth='lg'>
            <Grid container spacing={2}>
                <Grid sx={{ display: { xs: 'none', md: 'block' } }} item xs={12} md={3}>
                    <div className="h-screen overflow-y-scroll">
                        <Profile></Profile>
                    </div>
                </Grid>
                <Grid item xs={12} md={7}>
                    <div className="px-3">
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