import { Button, CircularProgress, Container, Grid, MenuItem, Select } from '@mui/material';
import axios from 'axios';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createGroup, selectData } from '../../../features/data/dataSlice';
import RequirementCard from '../../SmallComponents/RequirementCard/RequirementCard';
import LockIcon from '@mui/icons-material/Lock';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import BrushIcon from '@mui/icons-material/Brush';
import './CreateGroup.css'
import { Box } from '@mui/system';
const CreateGroup = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const data = useSelector(selectData);
    const [requirements, setRequirements] = useState([]);
    const [isDisabled, setIsDisabled] = useState(false);
    const [imgLoading, setImgLoading] = useState(false);
    const { register, handleSubmit, reset, unregister, setValue, watch, } = useForm();
    //handle gp type  
    const onSubmit = gpData => {
        gpData.members = [data?.user];
        gpData.admin = [data?.user];
        gpData.creator = data?.user;
        gpData.memberRequest = [];
        delete gpData.pic;
        if (!gpData.type) {
            gpData.type = 'public';
        }
        let allRequirement = [];
        for (const i of requirements) {
            allRequirement = [...allRequirement, gpData[`requirement${i}`]];
            delete gpData[`requirement${i}`];
        }
        gpData["allRequirement"] = allRequirement;

        // dispatch(createGroup(gpData))
        // navigate('/');
        console.log(gpData);
        // reset();
    }
    const handleType = e => {
        setValue('type', e.target.value);
    }
    useEffect(() => {
        if (watch('type') === 'private') {
            setRequirements([1]);
        }
        else {
            for (const i of requirements) {
                unregister(`requirement${i}`);
            }
            setRequirements([]);
        }
    }, [watch('type')]);

    useEffect(() => {
        if (!requirements.length) {
            setIsDisabled(true)
        }
        else if (watch(`requirement${requirements.length}`) === '') {
            setIsDisabled(true)
        }
        else {
            setIsDisabled(false);
        }
    }, [watch(`requirement${requirements.length}`)]);

    const handleAddRequirement = () => {
        setRequirements([...requirements, requirements.length + 1])
    }

    useEffect(() => {
        const file = watch('pic');
        if (file.length) {
            let body = new FormData()
            body.set('key', process.env.REACT_APP_IMAGEBB_API)
            body.append('image', file[0])
            setImgLoading(true);
            axios({
                method: 'post',
                url: 'https://api.imgbb.com/1/upload',
                data: body
            }).then(res => {
                setValue('gpPhoto', res.data?.data?.url)
            }).finally(() => setImgLoading(false))
        }
        else {
            setValue('gpPhoto', 'https://i.ibb.co/7zshrP5/pngtree-cartoon-education-training-cram-school-image-9149.jpg')
        }

    }, [watch('pic')]);
    return (
        <div className='mt-20'>
            <Container maxWidth="xl">
                <Grid container spacing={3}>
                    <Grid item xs={12} md={4}>
                        <form className='w-full' onSubmit={handleSubmit(onSubmit)} >
                            <input className="placeholder-gray-400 rounded-sm  w-full bg-transparent border-b py-2 border-red-100 px-2" type="text" placeholder='Enter Group Name' {...register("gpName", { required: true })} />

                            <h2 className='text-lg mt-5 mb-2 text-gray-300 font-bold'> Select Group Privacy</h2>
                            <div className='flex items-center' >
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={watch('type') ? watch('type') : 'public'}
                                    sx={{ width: '100%', color: '#fff' }}
                                    onChange={handleType}
                                >
                                    <MenuItem value={'public'}>Public</MenuItem>
                                    <MenuItem value={'private'}>Private</MenuItem>
                                </Select>
                            </div>
                            <input id="gpImg" accept='image/*' {...register("pic")} className='hidden' type="file" />
                            {
                                watch('type') === 'private' && <div className='flex mt-5 flex-col'>
                                    <h2 className='mb-1 text-lg text-gray-300 font-bold'>Add Questions For Join</h2>

                                    {
                                        requirements?.map(requirement => <RequirementCard watch={watch} setValue={setValue} unregister={unregister} setRequirements={setRequirements} register={register} requirements={requirements} key={requirement} num={requirement} ></RequirementCard>)

                                    }
                                    <Button onClick={handleAddRequirement} variant='contained' sx={{ mt: 2, background: '#0b3733', '&:hover': { background: 'rgba(16, 185, 129, .5)' } }} className='add-requirement' disabled={isDisabled} >Add Another Questions</Button>


                                </div>
                            }
                            <textarea className="placeholder-gray-400 rounded-sm  w-full bg-transparent border-b py-2 border-red-100 px-2" type="text" placeholder='Description' {...register("description", { required: true })} ></textarea>

                            <Button color='secondary' variant='contained' sx={{ background: 'rgb(0 255 232 / 20%)', mt: 3, width: '100%' }} type='submit'>Create</Button>
                        </form>
                    </Grid>
                    <Grid item xs={12} md={8}>
                        <div style={{ backgroundColor: '#0b3733' }} className='pb-5 rounded-xl border border-green-800'>
                            <div className='relative'>
                                {
                                    imgLoading ? <div className='h-60 flex justify-center items-center'><CircularProgress></CircularProgress> </div> : <img className='rounded-xl w-full' src={watch('gpPhoto')} alt="Group banner" />
                                }
                                <div className='absolute right-0 bottom-0'>
                                    <label htmlFor="gpImg" className='border border-green-600 md:mb-4 mb-2 mr-2 md:mr-10 px-3 py-2 bg-gray-900  rounded-md flex items-center'><BrushIcon  ></BrushIcon>Edit</label>
                                </div>
                            </div>
                            <div className='px-5 mt-5'>
                                <h2 className='text-3xl h-10'>{watch('gpName')}</h2>
                                <div className='flex mt-1'>
                                    {
                                        watch('type') === 'private' ? <h4 className=' flex items-center'> <LockIcon fontSize='small'></LockIcon>Private Group</h4> : <h4 className=' flex items-center'>  <LockOpenIcon fontSize='small'></LockOpenIcon>Public Group</h4>
                                    }
                                    <h3 className='ml-2 '> Creator {data?.user?.displayName}</h3>

                                </div>
                            </div>
                        </div>
                    </Grid>

                </Grid>
            </Container>

        </div >
    );
};

export default CreateGroup;