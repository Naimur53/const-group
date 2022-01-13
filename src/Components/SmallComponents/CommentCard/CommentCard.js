
import React, { useEffect, useRef, useState } from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Button, Grid, Menu } from '@mui/material';
import Editor from '../Editor/Editor';
import { useDispatch } from 'react-redux';
import { deleteComment, } from '../../../features/data/dataSlice';

const CommentCard = (props) => {
    const componentWrapper = useRef(null);
    const [anchorElUser, setAnchorElUser] = useState(null);
    const [codeValue, setCodeValue] = useState(null);
    const dispatch = useDispatch();

    useEffect(() => {
        setCodeValue(code)
    }, []);
    // handle event
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    }; const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };
    const handleDelete = id => {
        componentWrapper.current.style.display = 'none';
        dispatch(deleteComment({ ...props.info }));
    }
    // user and clint info 
    const data = props.data;
    const { PostInfo, postId, loves, time, client, pic, _id, code, codeType, comments, postIn } = props.info;
    console.log(props.info);

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
                            <div className='h-full flex items-center'>
                                <CardMedia
                                    component="img"
                                    height="100%"
                                    src={`data:image/jpeg;base64,${pic}`}
                                    alt="Paella dish"
                                />
                            </div>

                        </Grid>
                    }
                    {
                        code && <Grid item xs={12} md={pic ? 6 : 12}> <Editor
                            language={codeType}
                            readOnly
                            value={codeValue}
                            onChange={setCodeValue}
                        ></Editor>
                        </Grid>
                    }

                </Grid>
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

export default CommentCard;