import { Grid } from '@mui/material';
import React from 'react';
import CompoCard from '../CompoCard/CompoCard';
import PostComment from '../PostComment/PostComment';

const CommentWrapper = props => {

    return (
        <div>
            <PostComment info={props.info.info}></PostComment>
            <Grid container spacing={2}>
                {
                    props?.info?.info?.comments?.map(comment => <CompoCard comment key={props?.info?.info?.time} data={props.data} info={comment}></CompoCard>)
                }
            </Grid>
        </div>
    );
};

export default CommentWrapper;