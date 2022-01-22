import { Box, Button, Container, Grid } from '@mui/material';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { allGroup, selectData, setGpInfo } from '../../../features/data/dataSlice';
import GroupCard from '../../SmallComponents/GroupCard/GroupCard';
import AddIcon from '@mui/icons-material/Add';
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
                    <Grid item xs={12} md={4} >
                        <div className='h-full  w-full p-2 '>
                            <Box component={NavLink} to='/group/create' style={{ backgroundColor: '#ffffff26' }} className=' flex justify-center sm:py-3 items-center w-full h-full rounded-md'>
                                <div>
                                    <AddIcon sx={{ fontSize: 100 }}></AddIcon>
                                    <h1 className='text-xl text-center'>Create Group</h1>
                                </div>
                            </Box>
                        </div>
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