import * as React from 'react';
import { useNavigate } from "react-router-dom";
import { connect, useDispatch, useSelector } from 'react-redux';

import Paper from '@mui/material/Paper';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Toolbar from '@mui/material/Toolbar';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import GroupIcon from '@mui/icons-material/Group';
import Avatar from '@mui/material/Avatar';
import AppBar from '@mui/material/AppBar';
import Menu from '@mui/material/Menu';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import PersonAdd from '@mui/icons-material/PersonAdd';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';

import { deepOrange, deepPurple } from '@mui/material/colors';

import { GetInitials } from '../lib/utilities';

import VerticalTabs from '../tabs/dashboard-tab-panel.js';

import { 
  AuthStatus, 
  setAuthStatus,
  setRegisteredUserRole, 
  // setRegisteredUserEmail, 
  // setRegisteredUserName, 
  // setRegisteredUserFirstName, 
  // setRegisteredUserLastName, 
  // setRegisteredUserId, 
  // setAccessToken,
  // setRefreshToken 
} from '../../actions/actions';

import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  button: {
    margin: 2,
    marginTop: 2,
  }
}));

function Dashboard() {
  const classes = useStyles();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const role = useSelector( (state) => state.user.role);
  const firstName = useSelector( (state) => state.user.firstName);
  const lastName = useSelector( (state) => state.user.lastName);
  const userName = useSelector( (state) => state.user.username);

  const loggedIn = useSelector( (state) => state.auth.loggedIn);
  const accessToken = useSelector( (state) => state.auth.accessToken);

  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleSignOut = () => {
    dispatch(setRegisteredUserRole('None'));
    dispatch(setAuthStatus(AuthStatus.LOG_OUT));
    navigate('/signin');
  }

  return (
    <div>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Dashboard
            </Typography>
            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
              <Avatar sx={{ bgcolor: deepOrange[300] }}>{GetInitials(firstName + ' ' + lastName)}</Avatar> 
            </IconButton>
          </Toolbar>
        </AppBar>

        <VerticalTabs />

        <Menu
          anchorEl={anchorElUser}
          open={Boolean(anchorElUser)}
          onClose={handleCloseUserMenu}
          PaperProps={{
            elevation: 0,
            sx: {
              overflow: 'visible',
              filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
              mt: 1.5,
              '& .MuiAvatar-root': {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
              },
              '&:before': {
                content: '""',
                display: 'block',
                position: 'absolute',
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: 'background.paper',
                transform: 'translateY(-50%) rotate(45deg)',
                zIndex: 0,
              },
            },
          }}
        >
          <MenuItem>
            <Avatar /> Logged in as {userName}
          </MenuItem>

          <MenuItem>
            <Avatar /> My Account
          </MenuItem>

          <Divider />

          <MenuItem>
            <ListItemIcon>
              <Settings fontSize="small" />
            </ListItemIcon>
            Settings
          </MenuItem>

          <Divider />
          
          <MenuItem onClick={handleSignOut}>
            <ListItemIcon>
              <Logout fontSize="small" />
            </ListItemIcon>
            SignOut
          </MenuItem>
          
        </Menu>
    </div>
  );
}

const mapStateToProps = function (state) {
  return {
      userId: state.user.userId,
      email: state.user.email,
      role: state.user.role,
      username: state.user.userName,
      firstName: state.user.firstName,
      lastName: state.user.lastName,
      loggedIn: state.auth.loggedIn,
      accessToken: state.auth.accessToken,
      refreshToken: state.auth.refreshToken
  }
}

export default connect(mapStateToProps)(Dashboard);