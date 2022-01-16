import { Button } from '@mui/material';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { NavLink, useParams, } from 'react-router-dom';
import { selectData } from '../../../features/data/dataSlice';

const GroupNav = () => {
    const data = useSelector(selectData);
    const { gpId } = useParams();
    // useEffect(() => {
    //     console.log(pathname);

    // }, [])
    return (
        <div className='flex mt-36 md:mt-20 '>
            <Button
                component={NavLink}
                to={`/${gpId}/announcement`}
                sx={{ my: 2, color: 'white', display: 'block' }}
            >
                Announcement
            </Button>
            <Button
                component={NavLink}
                to={`/${gpId}/help`}
                sx={{ my: 2, color: 'white', display: 'block' }}
            >
                Help
            </Button>
            <Button
                component={NavLink}
                to={`/${gpId}/discussion`}
                sx={{ my: 2, color: 'white', display: 'block' }}
            >
                Discussion
            </Button>
            <Button
                component={NavLink}
                to={`/${gpId}/discussion`}
                sx={{ my: 2, color: 'white', display: 'block' }}
            >
                Show Off
            </Button>
            <Button
                component={NavLink}
                to={`/${gpId}/manageUser`}
                sx={{ my: 2, color: 'white', display: 'block' }}
            >
                Manage User
            </Button>

        </div>
    );
};

export default GroupNav;