import React from 'react';
import AddMember from '../../SmallComponents/AddMember/AddMember';
import RemoveUser from '../../SmallComponents/RemoveUser/RemoveUser';

const ManageGroupUser = () => {
    return (
        <div className=''>
            <AddMember></AddMember>
            <RemoveUser></RemoveUser>
        </div>
    );
};

export default ManageGroupUser;