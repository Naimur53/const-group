import React from 'react';
import AddMember from '../../SmallComponents/AddMember/AddMember';
import GroupNav from '../../SmallComponents/GroupNav/GroupNav';
import RemoveUser from '../../SmallComponents/RemoveUser/RemoveUser';

const ManageGroupUser = () => {
    return (
        <div className=''>
            <GroupNav></GroupNav>
            <AddMember></AddMember>
            <RemoveUser></RemoveUser>
        </div>
    );
};

export default ManageGroupUser;