import { Button, Menu } from '@mui/material';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useParams, } from 'react-router-dom';
import { deleteGroup, selectData } from '../../../features/data/dataSlice';

const GroupNav = () => {
    const data = useSelector(selectData);
    const dispatch = useDispatch();
    const { gpId } = useParams();
    const handleOpenAdminMenu = (event) => {
        setAnchorElAdmin(event.currentTarget);
    };
    const handleCloseAdminMenu = () => {
        setAnchorElAdmin(null);
    };
    const [anchorElAdmin, setAnchorElAdmin] = useState(null);
    const handleDelete = () => {
        if (window.confirm('Are you sure to delete is group')) {
            dispatch(deleteGroup({ gpId }));
        }
    }
    return (
        <div className='relative mt-36 md:mt-20 '>
            <div style={{ zIndex: '1200' }} className='md:flex hidden  fixed top-0 '>
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
                    to={`/${gpId}/showoff`}
                    sx={{ my: 2, color: 'white', display: 'block' }}
                >
                    Show Off
                </Button>
                <Button
                    component={NavLink}
                    to={`/${gpId}/manageUser`}
                    sx={{ my: 2, color: 'white', display: 'block' }}
                >
                    Users
                </Button>
                {
                    data.isGpAdmin && <Button
                        onClick={handleOpenAdminMenu}
                        sx={{ my: 2, color: 'white', display: 'block' }}
                    >
                        Manage Group
                    </Button>
                }

            </div>
            <Menu
                sx={{ mt: '45px' }}
                id="admin-menu"
                anchorEl={anchorElAdmin}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                open={Boolean(anchorElAdmin)}
                onClose={handleCloseAdminMenu}
            >
                <div onClick={() => { handleCloseAdminMenu(); }}>
                    <Button component={NavLink}
                        sx={{ my: 2, color: 'white', display: 'block' }}
                        to={`/${gpId}/manageRequest`}>Join Request
                    </Button>
                </div>
                <div onClick={() => { handleCloseAdminMenu(); }}>
                    <Button onClick={handleDelete}
                        sx={{ my: 2, color: 'white', display: 'block' }} >Delete Group
                    </Button>
                </div>
            </Menu>
        </div>
    );
};

export default GroupNav;