import { Button, Container } from '@mui/material';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createGroup, selectData } from '../../../features/data/dataSlice';

const CreateGroup = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const data = useSelector(selectData)
    const { register, handleSubmit, reset, setValue, watch, formState: { errors } } = useForm();
    const onSubmit = gpData => {
        gpData.members = [data?.user];
        gpData.admin = [data?.user];
        gpData.creator = data?.user;
        if (!gpData.type) {
            gpData.type = 'public';
        }
        console.log(gpData);
        dispatch(createGroup(gpData))
        navigate('/');
    }
    const handleType = e => {
        setValue('type', e.target.value);
    }
    return (
        <div className='mt-20'>
            <Container>
                <form className='w-1/2' onSubmit={handleSubmit(onSubmit)} >
                    <input className="placeholder-gray-100  w-full bg-transparent border-b py-2 border-red-100 px-2" type="text" placeholder='Enter uniq group name' {...register("gpName", { required: true })} />

                    <input onClick={handleType} id='public' name='type' type="radio" value='public' />
                    <label htmlFor="public">public </label>

                    <input onClick={handleType} id='private' name='type' type="radio" value='private' />
                    <label htmlFor="private">private </label>
                    <br />
                    {
                        // watch('type') === 'private' && <div>
                        //     <input type="text" className="placeholder-gray-100 bg-transparent border-b py-2 border-red-100 px-2" />

                        //     <Button>Add requirement</Button>
                        // </div>
                    }
                    <Button variant='contained' type='submit'>Create</Button>
                </form>
            </Container>

        </div>
    );
};

export default CreateGroup;