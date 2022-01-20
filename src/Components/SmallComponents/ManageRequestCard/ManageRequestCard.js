import { Button, Grid } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { acceptRequest, cancelRequest, selectData } from '../../../features/data/dataSlice';

const ManageRequestCard = props => {
    const { displayName, email, photoURL, reqAns } = props.info;
    const [question, setQuestion] = useState([]);
    const [ans, setAns] = useState([]);
    const dispatch = useDispatch();
    const { gpInfo, user } = useSelector(selectData);
    const { type } = gpInfo;
    const handleAccept = () => {
        console.log('accept');
        console.log({ gpId: gpInfo._id, user });
        dispatch(acceptRequest({ gpId: gpInfo._id, user: props.info }));
        dispatch(cancelRequest({ gpId: gpInfo._id, user: props.info, deleteRequest: true }))
    }
    const handleDelete = () => {
        console.log('delete');
        console.log({ gpId: gpInfo._id, user: props.info, deleteRequest: true });
        dispatch(cancelRequest({ gpId: gpInfo._id, user: props.info, deleteRequest: true }))
    }
    useEffect(() => {
        if (type === 'private') {
            setQuestion(Object.keys(reqAns))
            setAns(Object.values(reqAns))
        }
    }, []);
    console.log(ans, question);
    return (
        <Grid item xs={6}>
            <div style={{ backgroundColor: '#ffffff26' }} className='p-4 rounded-xl' >
                <div className="flex  items-center ">
                    <img className='w-12 h-12 rounded-full mr-2' src={photoURL} alt="" />
                    <div className='mr-2'>
                        <h2 className='text-lg'>{displayName}</h2>
                        <h2 className='text-xs'>{email}</h2>
                    </div>
                    <div>
                        <Button sx={{ mb: 3 }} onClick={handleAccept} color='success' variant='contained'>accept</Button>
                        <Button
                            onClick={handleDelete}
                            color='error'
                            variant='contained'>delete</Button>
                    </div>
                </div>
                {
                    type === 'private' && <div>
                        {
                            ans.map((sAns, i) => <div>
                                <h2>Question: {question[i]}</h2>
                                <h2>Ans: {sAns}</h2>
                            </div>)
                        }
                    </div>
                }
            </div>
        </Grid>
    );
};

export default ManageRequestCard;