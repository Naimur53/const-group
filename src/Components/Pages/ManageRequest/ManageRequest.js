import { Grid } from '@mui/material';
import React from 'react';
import { useSelector } from 'react-redux';
import { selectData } from '../../../features/data/dataSlice';
import GroupNav from '../../SmallComponents/GroupNav/GroupNav';
import ManageRequestCard from '../../SmallComponents/ManageRequestCard/ManageRequestCard';

const ManageRequest = () => {
    const data = useSelector(selectData);
    const requests = data?.gpInfo?.memberRequest
    return (
        <div className='mt-32'>
            <GroupNav></GroupNav>
            <Grid container spacing={3}>
                {
                    !requests.length && <h2 className='text-xl ml-4'>No request Found</h2>
                }
                {
                    requests.map(user => <ManageRequestCard key={user.uid} info={user}></ManageRequestCard>)
                }
            </Grid>
        </div>
    );
};

export default ManageRequest;