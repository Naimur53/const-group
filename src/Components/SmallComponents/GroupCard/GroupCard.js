import { Box, Button, Grid } from '@mui/material';
import React from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { resetState, selectData, setGpInfo } from '../../../features/data/dataSlice';

const GroupCard = props => {
    const dispatch = useDispatch();
    const { gpName, members } = props.info
    const data = useSelector(selectData);
    const handleCheckout = () => {
        dispatch(resetState())
        dispatch(setGpInfo(props.info))

    }
    return (
        <Grid item xs={4}>
            <Box sx={{ backgroundColor: ' #ffffff26' }} className='my-3'>
                <h2>{gpName}</h2>
                <h2>user:{members.length}</h2>
                <div>
                    {
                        members.includes(data?.user?.email) ? <Button component={NavLink} onClick={handleCheckout} to={`/${gpName.split(' ').join('-')}/help`}>Checkout</Button> : <Button component={NavLink} to={`/`}>Request For join</Button>
                    }
                </div>
            </Box>

        </Grid >
    );
};

export default GroupCard;