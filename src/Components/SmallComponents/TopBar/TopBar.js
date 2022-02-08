import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import { useDispatch, useSelector } from 'react-redux';
import { handleProfileToggle, selectData } from '../../../features/data/dataSlice'
import { NavLink, useParams } from 'react-router-dom';
import useFirebase from '../../../hooks/useFirebase';
import CampaignIcon from '@mui/icons-material/Campaign';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import PsychologyIcon from '@mui/icons-material/Psychology';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
const TopBar = () => {
    const data = useSelector(selectData);
    const dispatch = useDispatch();
    const { handleSignOut } = useFirebase();
    const [anchorElUser, setAnchorElUser] = React.useState(null);
    const [anchorElAdmin, setAnchorElAdmin] = React.useState(null);
    const { gpId } = useParams();

    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };
    const handleOpenAdminMenu = (event) => {
        setAnchorElAdmin(event.currentTarget);
    };


    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };
    const handleCloseAdminMenu = () => {
        setAnchorElAdmin(null);
    };

    return (
        <AppBar sx={{ backgroundColor: '#082429' }} position="fixed">
            <Container maxWidth="xl">
                <Toolbar className='justify-between' sx={{ display: { xs: 'flex', md: "none" } }} disableGutters>
                    <div><NavLink to='/'>Const Group</NavLink></div>
                    <div>
                        {
                            data?.user?.email ? <Tooltip title="Open settings">
                                <IconButton onClick={() => {
                                    dispatch(handleProfileToggle());
                                }} sx={{ p: 0 }}>
                                    <Avatar sx={{ width: 40, height: 40 }} alt="user img" src={data?.user?.photoURL} />
                                </IconButton>
                            </Tooltip> : <div>
                                <Button to='/login' color='secondary' variant='contained' sx={{ background: 'rgb(0 255 232 / 20%)', mr: 1 }} component={NavLink}>LogIn</Button>
                                <Button to='/signup' color='secondary' variant='contained' sx={{ background: 'rgb(0 255 232 / 20%)' }} component={NavLink}>signUp</Button>
                            </div>
                        }
                    </div>
                </Toolbar>
                {
                    <Toolbar disableGutters>
                        {/* for bigger device */}
                        <Typography
                            variant="h6"
                            noWrap
                            component="div"
                            sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
                        >
                            {
                                data.gpInfo?.gpName ? <Button component={NavLink} to='/' sx={{ my: 2, color: 'white', display: 'block' }}>{data.gpInfo?.gpName}</Button> : <NavLink to='/'>Const Group</NavLink>
                            }
                        </Typography>

                        {
                            data.gpInfo._id && <Typography
                                className='justify-between  '
                                variant="h6"
                                noWrap
                                component="div"
                                sx={{ mx: 2, flexGrow: 1, display: { xs: 'flex', md: 'none' } }}
                            >
                                <Tooltip title='Announcement Tab'>
                                    <IconButton to={`${data.gpInfo._id}/announcement`} component={NavLink}>
                                        <CampaignIcon></CampaignIcon>
                                    </IconButton>
                                </Tooltip>
                                <Tooltip title='Asked for help '>
                                    <IconButton to={`${data.gpInfo._id}/help`} component={NavLink}>
                                        <HelpOutlineIcon></HelpOutlineIcon>
                                    </IconButton>
                                </Tooltip>
                                <Tooltip title='Discussion Tab'>
                                    <IconButton to={`${data.gpInfo._id}/discussion`} component={NavLink}>
                                        <PsychologyIcon></PsychologyIcon>
                                    </IconButton>
                                </Tooltip>
                                <Tooltip title='Show Off Tab'>
                                    <IconButton to={`${data.gpInfo._id}/showoff`} component={NavLink}>
                                        <LocalFireDepartmentIcon></LocalFireDepartmentIcon>
                                    </IconButton>
                                </Tooltip>
                                {
                                    data.gpAdmin && <Tooltip title='DashBoard'>
                                        <IconButton onClick={handleOpenAdminMenu}>
                                            <AdminPanelSettingsIcon></AdminPanelSettingsIcon>
                                        </IconButton>
                                    </Tooltip>
                                }
                            </Typography>
                        }
                        <Box sx={{ mx: 'auto', flexGrow: 0, display: { xs: 'none', md: 'flex' } }}>
                            {
                                // data.admin && <Button
                                //     component={NavLink}
                                //     to='/dashboard'
                                //     sx={{ my: 2, color: 'white', display: 'block' }}
                                // >
                                //     Dashboard
                                // </Button>
                            }

                        </Box>

                        <Box sx={{ flexGrow: 0, display: { xs: 'none', md: 'block' } }}>
                            {
                                data?.user?.email ? <Tooltip title="Open settings">
                                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                        <Avatar sx={{ width: 40, height: 40 }} alt="Remy Sharp" src={data?.user?.photoURL} />
                                    </IconButton>
                                </Tooltip> : <div>
                                    <Button to='/login' color='secondary' variant='contained' sx={{ background: 'rgb(0 255 232 / 20%)', mr: 1 }} component={NavLink}>LogIn</Button>
                                    <Button to='/signup' color='secondary' variant='contained' sx={{ background: 'rgb(0 255 232 / 20%)' }} component={NavLink}>signUp</Button>
                                </div>
                            }
                            <Menu
                                sx={{ mt: '45px' }}
                                id="menu-appbar"
                                anchorEl={anchorElUser}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={Boolean(anchorElUser)}
                                onClose={handleCloseUserMenu}
                            >
                                {
                                    <Button onClick={() => { handleSignOut(); handleCloseUserMenu(); }}>LogOut</Button>
                                }
                            </Menu>
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
                                    <Button component={NavLink}
                                        sx={{ my: 2, color: 'white', display: 'block' }}
                                        to={`/${gpId}/manageRequest`}>Delete Group
                                    </Button>
                                </div>
                            </Menu>
                        </Box>
                    </Toolbar>
                }
            </Container>
        </AppBar>
    );
};
export default TopBar;