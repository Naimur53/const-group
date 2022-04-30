import { Container, Grid } from '@mui/material';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { Outlet, } from 'react-router';
import { getNotification, selectData } from '../../../features/data/dataSlice';
import Profile from '../Profile/Profile';
const Home = () => {
    const data = useSelector(selectData)
    const dispatch = useDispatch();
    useEffect(() => {
        if (data.user?.email) {
            dispatch(getNotification({ email: data.user?.email }));
        }
    }, [data.user])
    return (
        <Container maxWidth='xl'>
            <Grid container spacing={1}>
                <Grid sx={{ display: { xs: 'none', md: 'block' } }} item xs={12} md={3}>
                    <div className="sticky top-20 left-0 overflow-y-scroll">
                        <Profile></Profile>
                    </div>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Outlet></Outlet>
                </Grid>
                <Grid item xs={12} md={3}>
                    <div className="sticky top-20  left-0 overflow-y-scroll">
                        dfdfd
                        dfdfdfdfd
                        fgdf
                        df
                        df
                        dfd
                    </div>
                </Grid>
            </Grid>
        </Container>
    );
};

export default Home;