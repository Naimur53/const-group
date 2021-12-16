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
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Button, Grid, Menu } from '@mui/material';
import { useState } from 'react'
import { useDispatch } from 'react-redux';
import { updateLove } from '../../../features/data/dataSlice';
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
  const dispatch = useDispatch();
  const { PostInfo, loves, time, client, pic, _id } = props.info;
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
    if (loves.includes(data?.user?.email)) {
      setLove(true)
    }
  }, [])
  const handleClick = type => {
    if (love) {
      setLove(false)
      dispatch(updateLove({ type: "delete", email: data.user.email, _id }))
    }
    else {
      setLove(true)
      dispatch(updateLove({ type: "put", email: data.user.email, _id }))

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
            <IconButton onClick={handleOpenUserMenu} aria-label="settings">
              <MoreVertIcon />
            </IconButton>
          }
          title={client.displayName}
          subheader="September 14, 2016"
        />
        {
          pic && <CardMedia
            component="img"
            height="194"
            src={`data:image/jpeg;base64,${pic}`}
            alt="Paella dish"
          />
        }
        <CardContent>
          <Typography variant="body2"  >
            {PostInfo}
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <IconButton onClick={() => handleClick('love')}>
            <small className='text-xl mb-1 mr-1'>{loves.length}</small>

            <i className={love ? 'fas fa-heart text-xl text-pink-600' : 'fas fa-heart text-xl text-green-50'}></i>

          </IconButton>

          <ExpandMore
            expand={expanded}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </ExpandMore>
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <Typography paragraph>Method:</Typography>
            <Typography paragraph>
              Heat 1/2 cup of the broth in a pot until simmering, add saffron and set
              aside for 10 minutes.
            </Typography>
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
            <Button onClick={() => handleCloseUserMenu()}>Delete</Button>
          }
        </Menu>
      </Card>
    </Grid>
  );
};

export default CompoCard;