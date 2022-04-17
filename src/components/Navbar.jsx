import React, {useEffect, useState} from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import { get } from '../services/backend';

export default function MenuAppBar() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [email, setEmail] = useState('');


  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout =()=>{
    localStorage.removeItem('userToken')
    get('/user').then((data)=>{
      console.log(data);
    })
  }

  useEffect(()=>{
    
    get('/user').then((data)=>{
      setEmail(data.data.email);
    })
  }, []);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          
          {/* <h4>{email}</h4> */}
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            
          </Typography>
          
          <div>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={()=>{
                handleClose();
                handleLogout();
              }
              }>Logout</MenuItem>
            </Menu>
          </div>
          
        </Toolbar>
      </AppBar>
    </Box>
  );
}