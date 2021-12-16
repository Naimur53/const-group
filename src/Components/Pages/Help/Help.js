import { CircularProgress } from '@mui/material';
import React, { useEffect } from 'react';
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
    if (data.getLoad) {
        return <CircularProgress></CircularProgress>
    }
    return (
        <div className='h-screen px-6 pb-36 overflow-hidden overflow-y-scroll'>
            <Post></Post>

            <Grid container spacing={2}>

                {
                    data.getFromDB.map(sData => <CompoCard key={sData._id} info={sData} data={data}  ></CompoCard>)
                }

            </Grid>
        </div>
    );
};

export default Help;