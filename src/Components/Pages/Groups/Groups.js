import { Button, Container, Grid } from '@mui/material';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { allGroup, selectData, setGpInfo } from '../../../features/data/dataSlice';
import GroupCard from '../../SmallComponents/GroupCard/GroupCard';

const Groups = () => {
    const dispatch = useDispatch()
    const data = useSelector(selectData);
    useEffect(() => {
        dispatch(allGroup());
        dispatch(setGpInfo({}));
    }, [])
    return (
        <div className='mt-32'>
            <Container>
                <Grid container spacing={4}>
                    <Grid item xs={4}>
                        <Button variant='contained' component={NavLink} to='/group/create'>create group</Button>
                    </Grid>
                    {
                        data.groups.map(sData => <GroupCard key={sData._id} info={sData}></GroupCard>)
                    }
                </Grid>
            </Container>
        </div>
    );
};

export default Groups;