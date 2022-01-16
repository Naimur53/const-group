import { Button, Container, Grid } from '@mui/material';
import axios from 'axios';
import { getAuth } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { addUserToGroup, selectData } from '../../../features/data/dataSlice';
const AddMember = () => {
    const [memberData, setMemberData] = useState({});
    const [isMember, setIsMember] = useState({});
    const { register, handleSubmit, reset, watch, formState: { errors } } = useForm();
    const dispatch = useDispatch();
    const data = useSelector(selectData);
    const [clicked, setClicked] = useState(false);
    const onSubmit = info => {
        if (info.email !== memberData?.email) {
            console.log(info);
            axios.get(`http://localhost:5000/userInfo/${info.email}`)
                .then(res => setMemberData(res.data))
            setClicked(false);
        }

    }
    console.log(memberData);
    const handleAdd = (e) => {
        dispatch(addUserToGroup({
            user: memberData,
            gpId: data.gpInfo._id
        }))
        console.log('ho click e');
        setClicked(true);
    };

    useEffect(() => {
        setIsMember(data?.gpInfo?.members?.filter(user => user.email === memberData.email).length)
    }, [memberData, data.gpInfo])
    console.log(isMember);
    return (
        <div className='mt-32'>

            <Container>
                <div>
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
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
                                    <button style={{ backgroundColor: '#ffffff26' }} className='mb-3  md:mt-0 text-lg py-2 font-bold px-6 border-green-900  text-white rounded-full' type='submit'>Find</button>
                                </div>
                            </form>
                        </Grid>
                        <Grid item xs={6}>
                            {
                                memberData?.email ? <div style={{ backgroundColor: '#ffffff26' }} className='p-4 flex '>
                                    <img className='rounded-full h-8 w-8' src={memberData?.photoURL} alt="" />
                                    <div>
                                        <h2 className='ml-2 text-xl'>{memberData?.displayName}</h2>
                                        {
                                            !isMember ? <button onClick={!clicked ? handleAdd : null} style={{ backgroundColor: '#ffffff26' }} className=' mb-3  mt-3 text-lg py-2 font-bold px-6 border-green-900  text-white rounded-full' >add to group</button> : <div>Already members </div>
                                        }
                                    </div>
                                </div> : memberData === null &&
                                <div>
                                    user can not found
                                </div>
                            }

                        </Grid>
                    </Grid>
                </div>
            </Container>
        </div>
    );
};

export default AddMember;