import { getAuth, signOut } from '@firebase/auth';
import { Button, Drawer, Grid, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { handleProfileToggle, logout, selectData } from '../../../features/data/dataSlice';

const Profile = () => {
    const data = useSelector(selectData);
    const dispatch = useDispatch();
    const { displayName, photoURL, email } = data.user;
    const handleClick = () => {
        const auth = getAuth();
        signOut(auth).then(() => {
            dispatch(logout());
        })
    }
    return (
        <div className='mt-5'>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <div className="  justify-center">
                        <img className='w-1/3 rounded-full' src={photoURL} alt="" />
                    </div>
                </Grid>
                <Grid item xs={12}>
                    <div >
                        <Typography variant='h6'>{displayName}</Typography>
                        <Typography variant='body2'>{email}</Typography>
                    </div>
                </Grid>
                <Grid item xs={12}>
                    <Button sx={{ width: '100%', color: 'white', justifyContent: 'flex-start', py: 2, background: 'rgba(46, 125, 50, 0.09)' }} color='success' to={`/${email}/myPost`} component={NavLink} >
                        see your post
                    </Button>
                </Grid>
                <Grid item xs={12}>
                    <Button to={`/${email}/loved`} sx={{ width: '100%', color: 'white', justifyContent: 'flex-start', py: 2, background: 'rgba(219, 39, 119, 0.09)' }} color='error' component={NavLink}  >
                        see your loved post
                    </Button>
                </Grid>
            </Grid>

            <Drawer
                anchor='left'
                open={data.profileToggle}
                onClose={() => dispatch(handleProfileToggle())}
                sx={{ backgroundColor: 'transparent' }}
            >
                <Box sx={{ width: "70vw" }} role='presentation'>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <div className="  justify-center">
                                <img className='w-1/3 rounded-full' src={photoURL} alt="" />
                            </div>
                        </Grid>
                        <Grid item xs={12}>
                            <div >
                                <Typography variant='h6'>{displayName}</Typography>
                                <Typography variant='body2'>{email}</Typography>
                            </div>
                        </Grid>
                        <Grid item xs={12}>
                            <Button sx={{ width: '100%', color: 'white', justifyContent: 'flex-start', py: 2, background: 'rgba(46, 125, 50, 0.09)' }} color='success' to={`/${email}/myPost`} component={NavLink}    >
                                see your post
                            </Button>
                        </Grid>
                        <Grid item xs={12}>
                            <div >
                                <Button to={`/${email}/loved`} sx={{ width: '100%', color: 'white', justifyContent: 'flex-start', py: 2, background: 'rgba(219, 39, 119, 0.09)' }} color='error' component={NavLink}  >
                                    see your loved post
                                </Button>
                            </div>
                        </Grid>
                        <Grid item xs={12}>
                            <div className='flex justify-center' >
                                <Button color='secondary' variant='contained' sx={{ background: 'rgb(0 255 232 / 20%)', mr: 1 }} onClick={handleClick}>
                                    LogOut
                                </Button>
                            </div>
                        </Grid>
                    </Grid>
                </Box>
            </Drawer>
        </div >
    );
};

export default Profile;