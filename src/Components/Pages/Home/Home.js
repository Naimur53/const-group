import { Button, Container, Grid } from '@mui/material';
import React from 'react';
import { Outlet } from 'react-router';
import useFirebase from '../../../hooks/useFirebase';
const Home = () => {

    return (
        <Container maxWidth='xl'>
            <Grid container spacing={2}>
                <Grid item xs={12} md={4}>
                    <div className="h-screen"></div>
                </Grid>
                <Grid item xs={12} md={8}>
                    <div className="  px-3">
                        <Outlet></Outlet>
                    </div>

                </Grid>
            </Grid>
        </Container>
    );
};

export default Home;