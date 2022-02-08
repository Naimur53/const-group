import { CircularProgress, Grid } from '@mui/material';
import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { getFromDB, selectData } from '../../../features/data/dataSlice';
import GroupNav from '../../SmallComponents/GroupNav/GroupNav';
import Post from '../../SmallComponents/Post/Post';
import PostCard from '../../SmallComponents/PostCard/PostCard';

const Discussion = () => {
    const wrap = useRef()
    const dispatch = useDispatch();
    const data = useSelector(selectData);
    const { pathname } = useLocation();
    const [skip, setSkip] = useState(0);


    useEffect(() => {
        const gpId = pathname?.split('/')[1]
        const postIn = pathname?.split('/')[2]
        console.log(skip);
        if (data.getDiscussion.length) {
            dispatch(getFromDB({ gpId, postIn, skip: data.getDiscussion.length }));
        } else {
            dispatch(getFromDB({ gpId, postIn, skip }));

        }
    }, [pathname, dispatch, skip])
    const loadMore = e => {
        let scrolling = e.target.scrollTop + 300;
        let height = wrap.current?.clientHeight;
        let height2 = height / 2;
        if (scrolling >= height2 && skip !== data.getDiscussion.length) {
            setSkip(data.getDiscussion.length);
            console.log('loading more');
        }
    }
    return (
        <div onScroll={loadMore} className='h-screen px-2  pb-36 overflow-hidden overflow-y-scroll'>
            <GroupNav></GroupNav>
            <Post></Post>
            <Grid ref={wrap} container spacing={2}>

                {
                    data?.getDiscussion?.map(sData => <PostCard key={sData._id} info={sData} data={data}  ></PostCard>)
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

export default Discussion;