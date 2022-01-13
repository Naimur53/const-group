import { CircularProgress, Grid } from '@mui/material';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { getFromDB, selectData } from '../../../features/data/dataSlice';
import GroupNav from '../../SmallComponents/GroupNav/GroupNav';
import Post from '../../SmallComponents/Post/Post';
import PostCard from '../../SmallComponents/PostCard/PostCard';

const Announcement = () => {
    const dispatch = useDispatch();
    const data = useSelector(selectData);
    const { pathname } = useLocation()
    useEffect(() => {
        const gpName = pathname?.split('/')[1]
        const postIn = pathname?.split('/')[2]
        dispatch(getFromDB({ gpName, postIn }));
    }, [data.postLoad, pathname])

    return (
        <div className='h-screen px-2 pb-36 overflow-hidden overflow-y-scroll'>
            <GroupNav></GroupNav>
            {
                data.admin && <Post></Post>
            }
            <Grid sx={{ mt: data.admin }} container spacing={2}>

                {
                    data?.getAnnouncement?.map(sData => <PostCard key={sData._id} info={sData} data={data}  ></PostCard>)
                }
                <Grid items xs={12}>
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

export default Announcement;