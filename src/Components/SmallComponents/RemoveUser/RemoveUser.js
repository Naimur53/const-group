import React from 'react';
import { useSelector } from 'react-redux';
import { selectData } from '../../../features/data/dataSlice';
import RemoveUserCard from '../RemoveUserCard/RemoveUserCard';

const RemoveUser = () => {
    const { gpInfo } = useSelector(selectData);
    return (
        <div>
            {
                gpInfo.members.map(user => <RemoveUserCard info={user}></RemoveUserCard>)
            }
        </div>
    );
};

export default RemoveUser;