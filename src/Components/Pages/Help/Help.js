import { CircularProgress } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getFromDB, selectData } from '../../../features/data/dataSlice';
import Grid from '@mui/material/Grid';
import Post from '../../SmallComponents/Post/Post';
import PostCard from '../../SmallComponents/PostCard/PostCard';
import GroupNav from '../../SmallComponents/GroupNav/GroupNav';
import { useLocation } from 'react-router-dom';

const Help = () => {

    const dispatch = useDispatch();
    const data = useSelector(selectData);
    console.log(data.getFromDB);
    const { pathname } = useLocation()

    useEffect(() => {
        const gpId = pathname?.split('/')[1]
        const postIn = pathname?.split('/')[2]
        console.log({ gpId, postIn });
        dispatch(getFromDB({ gpId, postIn }));
    }, [data.postLoad, pathname])
    console.log(data.getLoad);
    // if (data.getLoad) {
    //     return 
    // }
    return (
        <div className='h-screen px-2  pb-36 overflow-hidden overflow-y-scroll'>
            <GroupNav></GroupNav>
            <Post></Post>
            <Grid container spacing={2}>

                {
                    data?.getHelp?.map(sData => <PostCard key={sData._id} info={sData} data={data}  ></PostCard>)
                }
                <Grid item xs={12}>
                    {
                        data.getLoad && <div className='mt-20 flex items-center justify-center'>
                            <CircularProgress></CircularProgress>
                        </div>

                    }
                </Grid>

            </Grid>
        </div>
    );
};

export default Help;