import { Avatar, Box, Button, CircularProgress, Grid } from '@mui/material';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import Fade from '@mui/material/Fade';
import Modal from '@mui/material/Modal';
import Backdrop from '@mui/material/Backdrop';

import { cancelRequest, resetState, selectData, sendRequest, setGpInfo, setPostLoad } from '../../../features/data/dataSlice';
import { useForm } from 'react-hook-form';
import LockIcon from '@mui/icons-material/Lock';
import LockOpenIcon from '@mui/icons-material/LockOpen';
const GroupCard = props => {
    const { gpName, _id, members, gpPhoto, memberRequest, type, allRequirement } = props.info;
    let memberReverse = [...members].reverse();
    const { register, handleSubmit, } = useForm();

    const dispatch = useDispatch();
    const data = useSelector(selectData);
    const [sendLoading, setSendLoading] = useState(false);

    // modal
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    //handle click
    const handleCheckout = () => {
        dispatch(resetState())
        dispatch(setGpInfo(props.info));
    }
    const handleRequest = () => {
        setSendLoading(true);
        dispatch(setPostLoad(true))
        dispatch(sendRequest({
            gpId: _id,
            user: data.user
        }))
    }
    const handlePending = () => {
        setSendLoading(true);
        dispatch(setPostLoad(true))
        dispatch(cancelRequest({
            gpId: _id,
            user: data.user
        }))
    };
    // handle private group requirement ans 
    const onSubmit = info => {
        setSendLoading(true);
        dispatch(setPostLoad(true))
        dispatch(sendRequest({
            gpId: _id,
            user: { ...data.user, reqAns: info }
        }))
    }
    useEffect(() => {
        setSendLoading(false)
    }, [data.groups]);
    const isMember = members.filter(user => user.email === data.user.email).length;
    const haveRequest = Boolean(memberRequest.filter(req => req?.email === data.user?.email).length);

    useEffect(() => {
        if (haveRequest) {
            setOpen(false);
        }
    }, [haveRequest])

    //style modal 
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        backdropFilter: 'blur(5px)',
        bgcolor: 'transparent',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    }
    return (
        <Grid item xs={12} md={4} >
            <Box sx={{ backgroundColor: '#ffffff26' }} className='my-3 rounded-lg p-3'>
                <div className=''>
                    <img className='w-full rounded-sm' src={gpPhoto} alt="" />
                </div>
                <div>
                    <h2 className='text-xl'>{gpName} </h2>
                    {
                        type === 'private' ? <h4 className=' flex items-center'> <LockIcon fontSize='small'></LockIcon>Private Group.{members.length} members</h4> : <h4 className=' flex items-center'>  <LockOpenIcon fontSize='small'></LockOpenIcon>Public Group. {members.length} members</h4>
                    }
                    <div className='flex items-center justify-between mt-3 ml-2'>
                        <div className='flex'>
                            {
                                memberReverse.slice(0, 5).map(mem => <Avatar key={mem.email} title={mem.displayName} sx={{ width: 20, height: 20, ml: -1 }} src={mem.photoURL}></Avatar>)
                            }
                        </div>
                        <div>
                            {
                                isMember ? <Button color='secondary' variant='contained' sx={{ background: 'rgb(0 255 232 / 20%)', mt: 1 }} component={NavLink} onClick={handleCheckout} to={`/${_id}/help`}>Checkout </Button> : sendLoading ? <CircularProgress></CircularProgress> : haveRequest ? <Button onClick={handlePending} color='secondary' variant='contained' sx={{ background: 'rgb(0 255 232 / 20%)', mt: 1 }} >Pending</Button> : type === 'private' ? <Button onClick={handleOpen} color='secondary' variant='contained' sx={{ background: 'rgb(0 255 232 / 20%)', mt: 1 }}>Request for join</Button> : <Button onClick={handleRequest} color='secondary' variant='contained' sx={{ background: 'rgb(0 255 232 / 20%)', mt: 1 }}>Request For join</Button>
                            }
                        </div>
                    </div>

                </div>


            </Box>
            {
                type === 'private' && <Modal
                    aria-labelledby="transition-modal-title"
                    aria-describedby="transition-modal-description"
                    open={open}
                    onClose={handleClose}
                    closeAfterTransition
                    BackdropComponent={Backdrop}
                    BackdropProps={{
                        timeout: 500,
                    }}
                >
                    <Fade in={open}>
                        <Box sx={style} className='backdrop-filter backdrop-blur-none' >
                            <h2 className='text-2xl'>Fill the all the requirement to join</h2>
                            <div>
                                <form onSubmit={handleSubmit(onSubmit)}>
                                    {
                                        allRequirement?.map((req, i) => <div>
                                            <h2>{req}</h2>
                                            <input className="placeholder-gray-100  w-full bg-transparent border-b py-2 border-red-100 px-2" type="text" placeholder='Enter valid ans' {...register(req, { required: true })} />
                                        </div>)
                                    }
                                    {
                                        sendLoading ? <CircularProgress></CircularProgress> : <Button type='submit'>Submit</Button>
                                    }
                                </form>
                            </div>
                        </Box>
                    </Fade>
                </Modal>
            }
        </Grid >
    );
};

export default GroupCard;