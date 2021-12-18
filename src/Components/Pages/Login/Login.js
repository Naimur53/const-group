import { Button } from '@mui/material';
import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useLocation, NavLink } from 'react-router-dom'
import useFirebase from '../../../hooks/useFirebase'
import { selectData } from '../../../features/data/dataSlice';
import { useForm } from 'react-hook-form';
const Login = () => {
    const { googleSignIn, logInWithEmail } = useFirebase();
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
        <div className='h-screen flex items-center justify-center flex-col '>
            <div style={{ backgroundColor: 'rgb(0 255 232 / 20%)' }} className='w-11/12	 md:w-1/3 md:h-3/5 px-3 py-8 rounded-lg'>
                <h2 className='font-bold text-xl mb-2'>Login From</h2>
                <hr className='w-10   border-t-4 rounded-full' />
                <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
                    <input
                        className='placeholder-gray-100 bg-transparent border border-green-300 mt-4 px-4 py-2 rounded-full'
                        placeholder='Email'
                        label="Email" variant="standard" type='email' {...register("email", { required: true })} />
                    {
                        errors.email && <div>This filed is required</div>
                    }
                    <input className='placeholder-gray-100 bg-transparent border border-green-300 mt-4 px-4 py-2 rounded-full' placeholder='Password' label="Password" name='password' variant="standard" {...register("password", { required: true, minLength: 6 })} />
                    {
                        errors.password && <div>password must be 6 length</div>
                    }
                    <div>
                        <input className='my-3 text-lg py-2 font-bold px-6 border-green-900 text-green-900 text-white rounded-full' type="submit" value='Login' />
                    </div>

                </form>
                <button onClick={() => googleSignIn(location, navigate)} type="button" className="login-with-google-btn rounded-full mr-2 mb-4" >
                    Sign in with Google
                </button>
                <Button sx={{ px: 3, py: 1.3, color: 'white', borderRadius: 30, border: '1px solid rgba(110, 231, 183,1)' }} to='/signUp' component={NavLink} >Dont have Account? </Button>
            </div>
        </div>
    );
};

export default Login;