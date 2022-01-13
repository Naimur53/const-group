import { CircularProgress, Grid } from '@mui/material';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useParams } from 'react-router';
import { myPost, selectData } from '../../../features/data/dataSlice';
import PostCard from '../../SmallComponents/PostCard/PostCard';

const Personal = () => {
    const data = useSelector(selectData);
    const { email } = useParams();
    const location = useLocation();
    const dispatch = useDispatch();
    const type = location.pathname?.split('/')[2];
    useEffect(() => {
        dispatch(myPost({ email, type }))
    }, [location])
    return (
        <div className='h-screen px-2 pb-36 overflow-hidden overflow-y-scroll'>
            dfdf
            <Grid container spacing={2}>
                <div className="mt-32 mx-2">Post:</div>
                {
                    type === 'myPost' && data?.getMyPost?.map(sData => <PostCard data={data} key={sData._id} info={sData}></PostCard>)
                }
                {
                    type === 'loved' && data?.getMyLovedPost?.map(sData => <PostCard key={sData._id} data={data} info={sData}></PostCard>)
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

export default Personal;