import { Button, Container } from '@mui/material';
import axios from 'axios';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { set, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createGroup, selectData } from '../../../features/data/dataSlice';
import RequirementCard from '../../SmallComponents/RequirementCard/RequirementCard';

const CreateGroup = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const data = useSelector(selectData);
    const [requirements, setRequirements] = useState([]);
    const [isDisabled, setIsDisabled] = useState(false);
    const { register, handleSubmit, reset, unregister, setValue, watch, formState: { errors } } = useForm();
    const onSubmit = gpData => {
        gpData.members = [data?.user];
        gpData.admin = [data?.user];
        gpData.creator = data?.user;
        gpData.memberRequest = [];

        if (!gpData.type) {
            gpData.type = 'public';
        }
        let allRequirement = [];
        for (const i of requirements) {
            console.log(gpData[`requirement${i}`]);
            allRequirement = [...allRequirement, gpData[`requirement${i}`]];
            delete gpData[`requirement${i}`];
        }
        gpData["allRequirement"] = allRequirement;
        console.log(gpData);
        // dispatch(createGroup(gpData))
        // navigate('/');
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
        setRequirements([...requirements, requirements[requirements.length - 1] + 1])
    }

    useEffect(() => {
        console.log("all requer", requirements);
        const file = watch('pic');
        if (file.length) {
            console.log(file);
            // const mainData = new FormData();
            // mainData.set('key', '752d2bbd9a2e4d6a5910df9c191e1643')
            // mainData.append('pic', file[0])
            // axios.post('http://localhost:5000/convertImg', mainData)
            //     .then(res => {
            //         console.log(res.data);
            //         const imgBase64 = res.data;
            //         console.log(process.env.REACT_APP_IMAGEBB_API);
            //         console.log(axios({
            //             method: 'post',
            //             url: 'https://api.imgbb.com/1/upload',
            //             data: { data: imgBase64 },
            //             headers: {
            //                 "content-type": "multipart/form-data",
            //             }
            //         }));
            //     })
            let body = new FormData()
            body.set('key', process.env.REACT_APP_IMAGEBB_API)
            body.append('image', file[0])
            // axios({
            //     method: 'post',
            //     url: 'https://api.imgbb.com/1/upload',
            //     data: body
            // }).then(res => console.log(res.data))
            console.log(file);
        }

    }, [watch('pic')]);
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
                    <input id="files" accept='image/*' {...register("pic")} className='' type="file" />
                    {
                        watch('type') === 'private' && <div className='flex flex-col'>
                            <Button onClick={handleAddRequirement} variant='contained' disabled={isDisabled} >Add requirement to Join</Button>
                            {
                                requirements.length && requirements.map(requirement => <RequirementCard register={register} key={requirement} num={requirement}></RequirementCard>)

                            }
                            <img src="" alt="" />

                        </div>
                    }
                    <Button variant='contained' type='submit'>Create</Button>
                </form>
            </Container>

        </div>
    );
};

export default CreateGroup;