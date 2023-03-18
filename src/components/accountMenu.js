import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import LogoutIcon from '@mui/icons-material/Logout';
import { getUserAttribute, logout } from '../services/auth';

const AccountMenu = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMyProfileClick = () => {
    handleClose();
  };

  const name = getUserAttribute('name');
  const familyName = getUserAttribute('family_name');
  const title = getUserAttribute('custom:Title');

  const getInitials = () => {
    const fullName = `${name} ${familyName}`.trim();
    const nameArray = fullName.split(' ');
    return nameArray[0][0] + (nameArray[1] ? nameArray[1][0] : '');
  };

  const getAvatar = () => {
    if (name) {
      return (
        <Avatar
          sx={{ width: 32, height: 32 }}
          alt={`${name} ${familyName}`}
        >
          {getInitials()}
        </Avatar>
      );
    }
    return (
      <Avatar
        sx={{ width: 32, height: 32 }}
        alt="User Avatar"
        style={{ backgroundColor: '#f48fb1' }}
      >
        {getInitials()}
      </Avatar>
    );
  };

  return (
    <>
      <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center', zIndex: 20 }}>
        <Tooltip title="My Profile">
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
          >
            {getAvatar()}
            <Typography sx={{ minWidth: 100, color: 'white' }} color="text.primary">
              My Profile
            </Typography>
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
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
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        {/* My Profile section */}
        <MenuItem onClick={() => { handleClose(); window.location.href = '/myprofile' }}>
          <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'common.white' }}>
            <ListItem alignItems="flex-start">
              <ListItemAvatar>
                {getUserAttribute('name') ? (
                  <Avatar sx={{ width: 32, height: 32 }}>
                    {getUserAttribute('name')[0]}
                  </Avatar>
                ) : (
                  <Avatar sx={{ width: 32, height: 32 }}>
                    {getInitials()}
                  </Avatar>
                )}
              </ListItemAvatar>
              <ListItemText
                primary={`${name} ${familyName}`}
                secondary={title}
              />
            </ListItem>
          </List>
        </MenuItem>
        {/* Divider */}
        <Divider />

        {/* Logout section */}
        <MenuItem onClick={logout} key="Sign Out">
          <ListItemIcon>
            <LogoutIcon fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </>
  );
};

export default AccountMenu;