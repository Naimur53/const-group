import { Button, CircularProgress, Modal, Box, Typography, Fab, FormControlLabel, Checkbox } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { selectData, sendComment } from '../../../features/data/dataSlice';
import Editor from '../Editor/Editor';
import CodeIcon from '@mui/icons-material/Code';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';

const PostComment = props => {
    const [codes, setCodes] = useState(null);
    const data = useSelector(selectData);
    const dispatch = useDispatch();
    const { _id, code, codeType, postIn } = props.info;
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const [postCode, setPostCode] = useState(false);
    const handleClick = () => setPostCode(!postCode);
    const onSubmit = info => {
        info.time = new Date();
        info.postId = _id;
        info.postIn = postIn;
        info.client = JSON.stringify(data.user);

        if (postCode) {
            info.code = codes;
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
        dispatch(sendComment(mainData))
    }
    useEffect(() => {
        setCodes(code)
    }, [code])
    // modal style 
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: "80%",
        bgcolor: 'transparent',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    return (
        <div className='flex justify-center'>
            {
                !data.postLoad ? <form style={{ backgroundColor: '#ffffff10' }} className="flex flex-col w-full px-3 my-2 py-2 rounded-md "
                    onSubmit={handleSubmit(onSubmit)}
                >
                    <input
                        type='text'
                        className="placeholder-gray-100  w-full bg-transparent border-b py-2 border-red-100 px-2"
                        placeholder='comment on this post'
                        {...register("PostInfo", { required: true })} />

                    <div className='flex flex-col md:flex-row justify-between py-4'>
                        <div className="inline-block">
                            <Fab size="medium" onClick={handleOpen} sx={{ background: 'rgb(0 255 232 / 20%)' }} color='secondary' aria-label="edit">
                                <CodeIcon />
                            </Fab>
                            <div className='inline-block ml-4'>
                                <Fab size="medium" sx={{ background: 'rgb(0 255 232 / 20%)' }} color='secondary' aria-label="edit">
                                    <label htmlFor="comment" className="">
                                        <AddPhotoAlternateIcon />
                                    </label>
                                </Fab>
                            </div>
                        </div>

                        <input id="comment" accept='image/*' {...register("pic")} className='hidden' type="file" />
                        <button style={{ backgroundColor: '#ffffff26' }} className='mb-3 mt-4 md:mt-0 text-lg py-2 font-bold px-6 border-green-900  text-white rounded-full' type='submit'>Comment</button>
                    </div>

                    {/* modal------------------ */}
                    <Modal
                        open={open}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                        <Box sx={style}>
                            <div className='flex justify-between mb-3'>
                                <Typography id="modal-modal-title" variant="h6" component="h2">
                                    Debug the code

                                </Typography>
                                <FormControlLabel
                                    value="start"

                                    control={<Checkbox
                                    />}
                                    label="Also post the code"
                                    onClick={handleClick}
                                    labelPlacement="start"
                                />
                                <Button
                                    variant="contained"
                                    color="error"
                                    onClick={handleClose}
                                >Close</Button>
                            </div>
                            <div className='h-96 '>
                                <Editor
                                    language={codeType}
                                    value={codes}
                                    onChange={setCodes}
                                ></Editor>
                            </div>
                            <Button

                                variant="contained"
                                disabled={
                                    watch('codeType') ? false : true
                                }
                                onClick={handleClose}
                            >Done</Button>
                        </Box>
                    </Modal>
                </form> : <CircularProgress></CircularProgress>
            }
        </div >
    );
};

export default PostComment;