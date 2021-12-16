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
import MenuItem from '@mui/material/MenuItem';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import { useSelector } from 'react-redux';
import { selectData } from '../../../features/data/dataSlice'
import { NavLink } from 'react-router-dom';
import useFirebase from '../../../hooks/useFirebase';
const pages = ['Products', 'Pricing', 'Blog'];
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

const TopBar = () => {
    const data = useSelector(selectData);
    const { handleSignOut } = useFirebase();
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    return (
        <AppBar className='bg-gray-200' position="static">
            <Container maxWidth="xl" className='bg-green-900'>
                <Toolbar className='justify-between' sx={{ display: { xs: 'flex', md: "none" } }} disableGutters>
                    <div>Const Group</div>
                    <div>
                        {
                            data?.user?.email ? <Tooltip title="Open settings">
                                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                    <Avatar sx={{ width: 40, height: 40 }} alt="Remy Sharp" src={data?.user?.photoURL} />
                                </IconButton>
                            </Tooltip> : <Button to='/login' component={NavLink}>LogIn</Button>
                        }
                    </div>
                </Toolbar>
                <Toolbar disableGutters>
                    {/* for bigger device */}
                    <Typography
                        variant="h6"
                        noWrap
                        component="div"
                        sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
                    >
                        Const Group
                    </Typography>

                    <Box sx={{ flexGrow: 0, display: { xs: 'flex', md: 'none' } }}>

                    </Box>
                    <Typography
                        className='justify-between  '
                        variant="h6"
                        noWrap
                        component="div"
                        sx={{ mx: 2, flexGrow: 1, display: { xs: 'flex', md: 'none' } }}
                    >
                        <AcUnitIcon></AcUnitIcon>
                        <AcUnitIcon></AcUnitIcon>
                        <AcUnitIcon></AcUnitIcon>
                        <AcUnitIcon></AcUnitIcon>
                    </Typography>
                    <Box sx={{ mx: 'auto', flexGrow: 0, display: { xs: 'none', md: 'flex' } }}>
                        <Button
                            component={NavLink}
                            to='/announcement'
                            onClick={handleCloseNavMenu}
                            sx={{ my: 2, color: 'white', display: 'block' }}
                        >
                            Announcement
                        </Button>
                        <Button
                            component={NavLink}
                            to='/help'
                            onClick={handleCloseNavMenu}
                            sx={{ my: 2, color: 'white', display: 'block' }}
                        >
                            Help
                        </Button>
                        <Button
                            component={NavLink}
                            to='/discussion'
                            onClick={handleCloseNavMenu}
                            sx={{ my: 2, color: 'white', display: 'block' }}
                        >
                            Discussion
                        </Button>
                        <Button
                            component={NavLink}
                            to='/showoff'
                            onClick={handleCloseNavMenu}
                            sx={{ my: 2, color: 'white', display: 'block' }}
                        >
                            Show Off
                        </Button>
                    </Box>

                    <Box sx={{ flexGrow: 0, display: { xs: 'none', md: 'block' } }}>
                        {
                            data?.user?.email ? <Tooltip title="Open settings">
                                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                    <Avatar sx={{ width: 40, height: 40 }} alt="Remy Sharp" src={data?.user?.photoURL} />
                                </IconButton>
                            </Tooltip> : <Button to='/login' component={NavLink}>LogIn</Button>
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
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
};
export default TopBar;