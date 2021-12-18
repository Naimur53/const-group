import { CircularProgress, Grid } from '@mui/material';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getFromDB, selectData } from '../../../features/data/dataSlice';
import CompoCard from '../../SmallComponents/CompoCard/CompoCard';
import Post from '../../SmallComponents/Post/Post';

const Announcement = () => {
    const dispatch = useDispatch();
    const data = useSelector(selectData);
    useEffect(() => {
        dispatch(getFromDB('announcement'));
    }, [data.postLoad])

    return (
        <div className='h-screen px-2 pb-36 overflow-hidden overflow-y-scroll'>
            {
                data.admin && <Post></Post>
            }
            <Grid container spacing={2}>

                {
                    data?.getAnnouncement?.map(sData => <CompoCard key={sData._id} info={sData} data={data}  ></CompoCard>)
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