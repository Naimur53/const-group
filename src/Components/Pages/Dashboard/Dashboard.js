import { Container, Grid } from '@mui/material';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { userAdmin } from '../../../features/data/dataSlice';

const Dashboard = () => {
    const { register, handleSubmit, reset, } = useForm();
    const dispatch = useDispatch();
    const onSubmit = info => {
        dispatch(userAdmin(info));
        alert(info.email, 'is now admin');
        reset();
    }
    return (
        <div className='mt-20'>
            <Container>
                <h2 className='text-center text-4xl mb-5'>Wellcome Admin</h2>
                <div>
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <h2>Make admin</h2>

                            <form style={{ backgroundColor: '#ffffff26' }} className="flex flex-col   w-full px-3 my-2 py-2 rounded-md "
                                onSubmit={handleSubmit(onSubmit)}
                            >
                                <div>
                                    <input
                                        type='email'
                                        placeholder='Enter email'
                                        className="placeholder-gray-100  w-full bg-transparent border-b py-2 border-red-100 px-2"
                                        {...register("email", { required: true })} />
                                </div>
                                <div className='mt-4'>
                                    <button style={{ backgroundColor: '#ffffff26' }} className='mb-3  md:mt-0 text-lg py-2 font-bold px-6 border-green-900  text-white rounded-full' type='submit'>Make</button>
                                </div>
                            </form>
                        </Grid>

                    </Grid>
                </div>
            </Container>
        </div>
    );
};

export default Dashboard;