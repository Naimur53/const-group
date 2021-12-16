import { Button, TextField } from '@mui/material';
import React from 'react';
import { useSelector } from 'react-redux';
import uesLocation from 'react'
import { useNavigate, useLocation, NavLink } from 'react-router-dom'
import useFirebase from '../../../hooks/useFirebase'
import { selectData } from '../../../features/data/dataSlice';
import { useForm } from 'react-hook-form';
const Login = () => {
    const { googleSignIn, handleSignOut, logInWithEmail } = useFirebase();
    const location = useLocation()
    const navigate = useNavigate()
    const data = useSelector(selectData);
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    if (data?.user?.email) {
        navigate('/');
    }
    const onSubmit = data => {
        logInWithEmail(data);
    }
    return (
        <div>
            <form className="flex flex-col bg-green-300 w-1/2 " onSubmit={handleSubmit(onSubmit)}>
                <TextField label="Email" variant="standard" type='email' {...register("email",)} />
                {
                    errors.email && <div>This filed is required</div>
                }
                <TextField label="Password" name='password' variant="standard" {...register("password", { required: true, minLength: 6 })} />
                {
                    errors.password && <div>password must be 6 length</div>
                }
                <input className='py-1 px-4 bg-red-700 text-white rounded' type="submit" value='Send' />

            </form>
            <Button onClick={() => googleSignIn(location, navigate)} variant="contained">Google Sign in </Button>
            <Button to='/signUp' component={NavLink} variant="contained">Dont have Account? </Button>
        </div>
    );
};

export default Login;