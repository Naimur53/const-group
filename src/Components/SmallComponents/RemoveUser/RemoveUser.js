import React from 'react';
import { useSelector } from 'react-redux';
import { selectData } from '../../../features/data/dataSlice';
import RemoveUserCard from '../RemoveUserCard/RemoveUserCard';

const RemoveUser = () => {
    const { gpInfo, } = useSelector(selectData);

    const checking = (sMem) => {
        let n = 0;
        for (const i in gpInfo.admin) {
            if (gpInfo.admin[i].email === sMem.email) {
                n++;

            }

        }
        if (!n) {
            return sMem
        }


    }
    let users = gpInfo.members.filter(checking);
    // let users = [];
    // const filteringAdmin = () => {
    //     for (const i in gpInfo.members) {
    //         const element = gpInfo.members[i];
    //         const checking = () => {

    //         }
    //         for (const j in gpInfo.admin) {

    //         }

    //     }
    // }


    return (
        <div>
            <h2>Admin</h2>
            {
                gpInfo.admin.map(sUser => <RemoveUserCard admin info={sUser}></RemoveUserCard>)
            }
            <h2 className='mt-4'>Users</h2>
            {
                users.map(sUser => <RemoveUserCard info={sUser}></RemoveUserCard>)
            }
        </div>
    );
};

export default RemoveUser;