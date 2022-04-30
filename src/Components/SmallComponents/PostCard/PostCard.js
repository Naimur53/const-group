import React, { useEffect, useRef } from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Button, Grid, Menu } from '@mui/material';
import { useState } from 'react'
import { useDispatch } from 'react-redux';
import { deletePost, updateLove } from '../../../features/data/dataSlice';
import Editor from '../Editor/Editor';
import CommentWrapper from '../CommentWrapper/CommentWrapper';
import processingNotification from '../../../functionalCode/notification';
const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));
//main component
const PostCard = props => {
  const [love, setLove] = useState(false);
  const [handleLoves, setHandleLoves] = useState(0);
  const dispatch = useDispatch();
  const { postInfo, loves, time, client, pic, _id, code, codeType, comments, postIn } = props.info;
  const [value, setValue] = useState(null)
  const data = props.data;
  const { i, array } = props;
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const componentWrapper = useRef(null)
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  }; const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const [expanded, setExpanded] = React.useState(false);
  console.log(i, array);
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  useEffect(() => {
    setValue(code)
    if (loves?.includes(data?.user?.email)) {
      setLove(true)
    }
    setHandleLoves(loves?.length);
  }, [])
  const handleLoveClick = type => {
    if (love) {
      setLove(false)
      setHandleLoves(handleLoves - 1)
      dispatch(updateLove({ type: "delete", email: data.user.email, _id }))
      processingNotification(data.user, props.info, 'love', dispatch, 'cancel')
    }
    else {
      setLove(true)
      setHandleLoves(handleLoves + 1)
      dispatch(updateLove({ type: "put", email: data.user.email, _id }))
      processingNotification(data.user, props.info, 'love', dispatch, 'post')
    }
  }
  const handleDelete = id => {
    componentWrapper.current.style.display = 'none'
    dispatch(deletePost({ _id, postIn: postIn }));

  }
  return (
    <Grid ref={componentWrapper} item xs={12}>
      <Card sx={{ backgroundColor: ' #ffffff26' }}>
        <CardHeader
          avatar={
            <Avatar sx={{ width: 40, height: 40 }} alt='client image' src={client?.photoURL} />
          }
          action={
            client?.email === data?.user?.email || data.admin ? <IconButton onClick={handleOpenUserMenu} aria-label="settings">
              <MoreVertIcon />
            </IconButton> :
              <IconButton aria-label="settings">
                <MoreVertIcon />
              </IconButton>
          }
          title={<h2 className='text-base'>{client.displayName}</h2>}
          subheader={<h6 className='text-xs text-gray-300'>{new Date(time).toLocaleString()}</h6>}
        />

        <CardContent>
          <h2 className='text-xl'>
            {postInfo}
          </h2>
        </CardContent>
        <Grid container>
          {
            pic && <Grid item xs={12} md={code ? 6 : 12}>
              <CardMedia
                component="img"
                height="100%"
                src={`data:image/jpeg;base64,${pic}`}
                alt="Paella dish"
              />

            </Grid>

          }
          {
            code && <Grid item xs={12} md={pic ? 6 : 12}> <Editor
              language={codeType}
              readOnly
              value={value}
              onChange={setValue}
            ></Editor>
            </Grid>
          }



        </Grid>
        {
          !props.comment && <CardActions disableSpacing>
            <IconButton onClick={() => handleLoveClick('love')}>
              <i className={love ? 'fas fa-heart text-xl text-pink-600' : 'fas fa-heart text-xl text-green-50'}></i>
              <span className='text-base mb-1 ml-2'>{handleLoves}</span>

            </IconButton>
            <ExpandMore
              onClick={handleExpandClick}
              aria-label="show more"
            >
              <span className='text-base mr-2 '>Comments:</span>
              <span className='text-base mr-2'>{comments.length}</span>

            </ExpandMore>
          </CardActions>
        }
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <CommentWrapper info={comments} toPostComment={props.info} data={data} ></CommentWrapper>
          </CardContent>
        </Collapse>
        <Menu
          sx={{ mt: '45px' }}
          id="menu-appbar"
          anchorEl={anchorElUser}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          keepMounted
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          open={Boolean(anchorElUser)}
          onClose={handleCloseUserMenu}
        >
          {
            <Button onClick={() => {
              handleCloseUserMenu();
              handleDelete()
            }}>Delete</Button>
          }
        </Menu>
      </Card>
    </Grid>
  );
};

export default PostCard;