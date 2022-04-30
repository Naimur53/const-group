import { CircularProgress } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getFromDB, selectData } from '../../../features/data/dataSlice';
import Grid from '@mui/material/Grid';
import Post from '../../SmallComponents/Post/Post';
import PostCard from '../../SmallComponents/PostCard/PostCard';
import GroupNav from '../../SmallComponents/GroupNav/GroupNav';
import { useLocation } from 'react-router-dom';
import { useRef } from "react";

const Help = () => {
    const wrap = useRef()
    const dispatch = useDispatch();
    const data = useSelector(selectData);
    const { pathname } = useLocation()
    const [skip, setSkip] = useState(0)

    useEffect(() => {
        const gpId = pathname?.split('/')[1]
        const postIn = pathname?.split('/')[2]
        if (data.getHelp.length) {
            dispatch(getFromDB({ gpId, postIn, skip: data.getHelp.length }));
        } else {
            dispatch(getFromDB({ gpId, postIn, skip }));
        }
    }, [pathname, dispatch, skip,])
    const loadMore = e => {
        let scrolling = e.target.scrollTop + 300;
        let height = wrap.current?.clientHeight;
        let height2 = height / 2;
        if (scrolling >= height2 && skip !== data.getHelp.length) {
            setSkip(data.getHelp.length);
            console.log('loading more');
        }
    }
    return (
        <div onScroll={loadMore}  >
            <GroupNav></GroupNav>
            <Post></Post>
            <Grid ref={wrap} container spacing={2}>

                {
                    data?.getHelp?.map((sData, i, array) => <PostCard key={sData._id} info={sData} setSkip={setSkip} data={data} i={i} array={array}></PostCard>)
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