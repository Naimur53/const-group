import { Button, CircularProgress, TextField } from '@mui/material';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useParams } from 'react-router';
import { postIndb, selectData } from '../../../features/data/dataSlice';

const Post = props => {
    const { pathname } = useLocation();
    const data = useSelector(selectData);
    const dispatch = useDispatch();
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const onSubmit = info => {
        console.log(info);
        info.time = new Date()
        // new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        info.postIn = pathname;
        info.client = JSON.stringify(data.user);
        console.log();
        const mainData = new FormData();
        for (const key in info) {
            if (key === 'pic') {
                mainData.append(key, info[key][0])
            }
            else {
                mainData.append(key, info[key])
            }
        }
        console.log(mainData.getAll('user'));
        console.log(info);
        dispatch(postIndb(mainData))

    }
    return (
        <div className='flex justify-center'>
            {
                !data.postLoad ? <form className="flex flex-col bg-green-800 w-full my-2 py-2 rounded-md " onSubmit={handleSubmit(onSubmit)}>
                    <TextField placeholder={
                        pathname === '/help' ? 'Asked for help' : pathname === '/announcement' ? 'lets announce' : pathname === '/showoff' && 'Lets Show off'

                    } variant="standard" {...register("PostInfo", { required: true })} />
                    <div>
                        <label htmlFor="files" className="btn">Select Image</label>
                        <input id="files" accept='image/*' {...register("pic")} className='hidden' type="file" />
                    </div>
                    <Button type='submit'>Submit</Button>
                </form> : <CircularProgress></CircularProgress>
            }
        </div>
    );
};

export default Post;