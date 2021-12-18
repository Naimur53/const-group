import { CircularProgress } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getFromDB, selectData } from '../../../features/data/dataSlice';
import Grid from '@mui/material/Grid';

import CompoCard from '../../SmallComponents/CompoCard/CompoCard';
import Post from '../../SmallComponents/Post/Post';

const Help = () => {

    const dispatch = useDispatch();
    const data = useSelector(selectData);
    console.log(data.getFromDB);
    useEffect(() => {
        dispatch(getFromDB('help'));
    }, [data.postLoad])
    console.log(data.getLoad);
    // if (data.getLoad) {
    //     return 
    // }
    return (
        <div className='h-screen px-2  pb-36 overflow-hidden overflow-y-scroll'>
            <Post></Post>
            <Grid container spacing={2}>

                {
                    data?.getHelp?.map(sData => <CompoCard key={sData._id} info={sData} data={data}  ></CompoCard>)
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