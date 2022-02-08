import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { IconButton } from '@mui/material';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { makeGroupAdmin, removeAdminOfGroup, removeUserFromGroup, selectData } from '../../../features/data/dataSlice';
import { useDispatch } from 'react-redux';
const RemoveUserCard = props => {
    const { photoURL, displayName, email } = props.info;
    const [anchorEl, setAnchorEl] = useState(null);
    const [isGroupAdmin, setIsGroupAdmin] = useState(false);
    const open = Boolean(anchorEl);

    const dispatch = useDispatch();
    const data = useSelector(selectData);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleMakeAdmin = () => {
        dispatch(makeGroupAdmin({
            gpId: data.gpInfo._id,
            user: props.info
        }));
    }
    const handleRemove = () => {
        dispatch(removeUserFromGroup({
            gpId: data.gpInfo._id,
            user: props.info
        }));
    }
    const handleRemoveAdmin = () => {
        dispatch(removeAdminOfGroup({
            gpId: data.gpInfo._id,
            user: props.info
        }));
    }
    useEffect(() => {

        const isAdmin = Boolean(data?.gpInfo?.admin.filter(sAdmin => sAdmin.email === data?.user?.email).length);

        const isCreator = data.gpInfo?.creator?.email === data.user?.email;

        if (isCreator) {
            setIsGroupAdmin("creator");
        }
        else if (isAdmin) {
            setIsGroupAdmin('admin')
        }
        else {
            setIsGroupAdmin('user');
        }
    }, [])
    return (
        <div className='flex py-4 justify-between items-center'>
            <div className='flex items-center'>
                <img className='w-12 h-12 rounded-full mr-2' src={photoURL} alt="" />
                <div>
                    <h2 className='text-lg'>{displayName}</h2>
                    <h2 className='text-xs'>{email}</h2>
                </div>
            </div>

            {/* {
                isGroupAdmin.isCreator ? '' : isGroupAdmin.clientAdmin ? '' : <IconButton
                    id="basic-button"
                    aria-controls={open ? 'basic-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                    onClick={handleClick}
                >
                    <MoreVertIcon></MoreVertIcon>
                </IconButton>
            } */}

            {
                email !== data.user.email || email !== data.gpInfo.creator.email ? isGroupAdmin === 'creator' ? <IconButton
                    id="basic-button"
                    aria-controls={open ? 'basic-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                    onClick={handleClick}
                >
                    <MoreVertIcon></MoreVertIcon>
                </IconButton> : isGroupAdmin === 'admin' && !props.admin ? <IconButton
                    id="basic-button"
                    aria-controls={open ? 'basic-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                    onClick={handleClick}
                >
                    <MoreVertIcon></MoreVertIcon>
                </IconButton> : '' : ''
            }

            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
            >
                {
                    !props.admin && isGroupAdmin === 'creator' ? <MenuItem MenuItem onClick={handleClose}>
                        <Button onClick={handleMakeAdmin}>Make admin</Button>
                    </MenuItem> : ''
                }
                {
                    isGroupAdmin === 'creator' && props.admin ? <MenuItem onClick={handleClose}>
                        <Button onClick={handleRemoveAdmin}>Remove admin</Button>
                    </MenuItem> : ''
                }

                {
                    !props.admin && <MenuItem onClick={handleClose}>
                        <Button onClick={handleRemove}>Remove {displayName}</Button>
                    </MenuItem>
                }
            </Menu>
        </div >
    );
};

export default RemoveUserCard;