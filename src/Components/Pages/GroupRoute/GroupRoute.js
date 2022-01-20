import React from 'react';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getGroupInfo, processGpAdmin, selectData } from '../../../features/data/dataSlice';

const GroupRoute = ({ children }) => {
    const data = useSelector(selectData);
    const { gpId } = useParams();
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getGroupInfo({ _id: gpId }))
    }, [gpId]);
    if (!data.postLoad) {
        console.log('is gp admin', data.isGpAdmin);
    }
    if (!data?.gpInfo?.members?.filter(user => user.email === data.user.email).length) {
        return <div className='mt-32 text-white'>
            you can not access this group

        </div>
    }

    return (
        <>
            {children}
        </>
    );
};

export default GroupRoute;