import { CircularProgress, IconButton, Modal, Box, Fab, FormLabel, RadioGroup, FormControlLabel, Radio, Tooltip } from '@mui/material';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router';
import { postIndb, selectData } from '../../../features/data/dataSlice';
import Editor from '../Editor/Editor';
import CodeIcon from '@mui/icons-material/Code';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import CloseIcon from '@mui/icons-material/Close';

const Post = props => {
    const [code, setCode] = useState(null);
    const { pathname } = useLocation();
    const data = useSelector(selectData);
    const dispatch = useDispatch();
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const onSubmit = info => {
        if (pathname === '/') {
            return alert('plz select a route')
        }
        info.time = new Date()
        // new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        info.postIn = pathname;
        info.client = JSON.stringify(data.user);
        if (code) {
            info.code = code;
        }
        const mainData = new FormData();
        for (const key in info) {
            if (key === 'pic') {
                mainData.append(key, info[key][0])
            }
            else {
                mainData.append(key, info[key])
            }
        }
        dispatch(postIndb(mainData))
    }
    // modal style 
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: "80%",
        height: '50vh',
        overflowX: 'scroll',
        backdropFilter: 'blur(30px)',
        bgcolor: 'transparent',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    return (
        <div className='flex justify-center mt-36 md:mt-20 '>
            {
                !data.postLoad ? <form style={{ backgroundColor: '#ffffff26' }} className="flex flex-col   w-full px-3 my-2 py-2 rounded-md "
                    onSubmit={handleSubmit(onSubmit)}
                >
                    <div>
                        <input
                            type='text'
                            className="placeholder-gray-100  w-full bg-transparent border-b py-2 border-red-100 px-2"
                            placeholder={
                                pathname === '/help' ? 'Asked for help' : pathname === '/announcement' ? 'Lets announce' : pathname === '/showoff' ? 'Lets Show off' : pathname === '/discussion' && 'Lets Discuss'
                            }
                            {...register("PostInfo", { required: true })} />
                    </div>

                    <div className='flex flex-col md:flex-row justify-between py-4'>
                        <div className='inline-block'>
                            <Tooltip title='Enter code'>
                                <Fab sx={{ background: 'rgb(0 255 232 / 20%)' }} color='secondary' size="medium" onClick={handleOpen} aria-label="edit">
                                    <CodeIcon />
                                </Fab>
                            </Tooltip>
                            <Tooltip title='Chose image'>
                                <div className='inline-block ml-4'>
                                    <Fab size="medium" sx={{ background: 'rgb(0 255 232 / 20%)' }} color='secondary' aria-label="f">
                                        <label htmlFor="files" className="">
                                            <AddPhotoAlternateIcon />
                                        </label>
                                    </Fab>
                                </div>
                            </Tooltip>
                        </div>
                        <input id="files" accept='image/*' {...register("pic")} className='hidden' type="file" />
                        <button style={{ backgroundColor: '#ffffff26' }} className='mb-3 mt-4 md:mt-0 text-lg py-2 font-bold px-6 border-green-900  text-white rounded-full' disabled={pathname === '/showoff' ? true : false} type='submit'>Post</button>
                    </div>
                    <Modal
                        open={open}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                        <Box sx={style}>

                            <div className='flex justify-end'>
                                <div >
                                    <IconButton onClick={() => {
                                        if (watch('codeType') === null && code !== null) {
                                            alert('Plz chose code type')
                                        }
                                        else {
                                            handleClose();

                                        }
                                    }}>
                                        <CloseIcon></CloseIcon>
                                    </IconButton>
                                </div>
                            </div>
                            <div>
                                <FormLabel sx={{ color: '#fff' }} component="legend">Code Language:</FormLabel>
                                <RadioGroup
                                    row
                                    aria-label="gender"
                                    defaultValue="female"
                                    name="radio-buttons-group"
                                    className='blur-3xl'
                                >
                                    <FormControlLabel {...register("codeType")} value="xml" control={<Radio />} label="Html" />
                                    <FormControlLabel {...register("codeType")} value="javascript" control={<Radio />} label="JavaScript" />
                                    <FormControlLabel {...register("codeType")} value="css" control={<Radio />} label="css" />
                                </RadioGroup>
                            </div>
                            <Editor
                                language={watch("codeType")}
                                value={code}
                                onChange={setCode}
                                readOnly={false}
                            ></Editor>

                        </Box>
                    </Modal>

                </form> : <CircularProgress></CircularProgress>
            }
        </div >
    );
};

export default Post;