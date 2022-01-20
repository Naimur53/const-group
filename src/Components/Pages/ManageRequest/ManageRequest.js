import { Grid } from '@mui/material';
import React from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { selectData } from '../../../features/data/dataSlice';
import ManageRequestCard from '../../SmallComponents/ManageRequestCard/ManageRequestCard';

const ManageRequest = () => {
    const data = useSelector(selectData);
    const dispatch = useDispatch();
    const requests = data?.gpInfo?.memberRequest
    console.log(requests);
    return (
        <div className='mt-32'>

            <Grid container spacing={3}>

                {
                    requests.map(user => <ManageRequestCard key={user.uid} info={user}></ManageRequestCard>)
                }
            </Grid>
        </div>
    );
};

export default ManageRequest;