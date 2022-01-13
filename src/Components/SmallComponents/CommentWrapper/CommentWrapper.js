import { Grid } from '@mui/material';
import React from 'react';
import CommentCard from '../CommentCard/CommentCard';
import PostComment from '../PostComment/PostComment';

const CommentWrapper = props => {
    return (
        <div>
            <PostComment info={props?.toPostComment}></PostComment>
            <Grid container spacing={2}>
                {
                    props?.info?.map(comment => <CommentCard comment key={comment?.time} data={props.data} info={comment}></CommentCard>)
                }
            </Grid>
        </div>
    );
};

export default CommentWrapper;