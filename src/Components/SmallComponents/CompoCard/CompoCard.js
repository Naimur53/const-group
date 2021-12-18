import React, { useEffect } from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Button, Grid, Menu } from '@mui/material';
import { useState } from 'react'
import { useDispatch } from 'react-redux';
import { deleteComment, deletePost, updateLove } from '../../../features/data/dataSlice';
import Editor from '../Editor/Editor';
import CommentWrapper from '../CommentWrapper/CommentWrapper';
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
const CompoCard = props => {
  const [love, setLove] = useState(false);
  const [handleLoves, setHandleLoves] = useState(0);
  const dispatch = useDispatch();
  const { PostInfo, postId, loves, time, client, pic, _id, code, codeType, comments, postIn } = props.info;
  const [value, setValue] = useState(null)
  const data = props.data;
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  }; const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  useEffect(() => {
    setValue(code)
    if (loves?.includes(data?.user?.email)) {
      setLove(true)
      setHandleLoves(loves.length);
    }
  }, [])
  const handleClick = type => {
    if (love) {
      setLove(false)
      setHandleLoves(handleLoves - 1)
      dispatch(updateLove({ type: "delete", email: data.user.email, _id }))
    }
    else {
      setLove(true)
      setHandleLoves(handleLoves + 1)
      dispatch(updateLove({ type: "put", email: data.user.email, _id }))

    }

  }
  const handleDelete = id => {
    if (!props.comment) {
      dispatch(deletePost({ _id: id, postIn: postIn }));
      console.log('this is not comment');
    }
    else {
      dispatch(deleteComment({ ...props.info }))
    }
  }
  return (
    <Grid item xs={12}>
      <Card sx={{ backgroundColor: ' #ffffff26' }}>
        <CardHeader
          avatar={
            <Avatar sx={{ width: 40, height: 40 }} alt="Remy Sharp" src={client?.photoURL} />
          }
          action={
            client?.email === data?.user?.email ? <IconButton onClick={handleOpenUserMenu} aria-label="settings">
              <MoreVertIcon />
            </IconButton> :
              <IconButton aria-label="settings">
                <MoreVertIcon />
              </IconButton>
          }
          title={client.displayName}
          subheader={new Date(time).toLocaleString()}
        />

        <CardContent>
          <Typography variant="body2"  >
            {PostInfo}
          </Typography>
        </CardContent>
        <Grid container>
          {
            pic && <Grid item xs={12} md={code ? 6 : 12}>
              <CardMedia
                component="img"
                height="194"
                src={`data:image/jpeg;base64,${pic}`}
                alt="Paella dish"
              />

            </Grid>
          }
          {
            code && <Grid item xs={12} md={pic ? 6 : 12}> <Editor
              language='javascript'
              readOnly
              value={value}
              onChange={setValue}
            ></Editor>
            </Grid>
          }

        </Grid>
        {
          !props.comment && <CardActions disableSpacing>
            <IconButton onClick={() => handleClick('love')}>
              <i className={love ? 'fas fa-heart text-xl text-pink-600' : 'fas fa-heart text-xl text-green-50'}></i>
              <span className='text-base mb-1 ml-2'>{handleLoves}</span>

            </IconButton>
            <ExpandMore
              onClick={handleExpandClick}
              aria-label="show more"
            >
              <span className='text-base mr-2'>Comments:</span>
              <span className='text-base mr-2'>{comments.length}</span>

            </ExpandMore>
          </CardActions>
        }
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <CommentWrapper info={props} data={data} ></CommentWrapper>
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
              handleDelete(_id)
            }}>Delete</Button>
          }
        </Menu>
      </Card>
    </Grid>
  );
};

export default CompoCard;