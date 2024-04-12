import React, { useState } from 'react';
import './landingNavBar.css';
import Logo from '../../../Resources/AdaptiLearn Logo.png';
import NavLink from './NavLink'; // Assuming NavLink is in the same directory
import MenuIcon from '@mui/icons-material/Menu';
import { IconButton, Menu, MenuItem } from '@mui/material';
import { Link } from 'react-router-dom'; // Assuming you're using react-router

export default function NavBar() {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className="landing-navbar">
      <Link to="/">
      <img src={Logo} className='Logo' alt="AdaptiLearn Logo"/>
      </Link>
      <IconButton
        edge="start"
        color="inherit"
        aria-label="menu"
        sx={{ display: { xs: 'block', md: 'none' } }} // Only visible on small screens
        onClick={handleClick}
      >
        <MenuIcon />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        keepMounted
        open={open}
        onClose={handleClose}
        sx={{ display: { xs: 'block', md: 'none' } }} // Only visible on small screens
      >
        <MenuItem onClick={handleClose} component={Link} to="/" sx={{ '&:hover': { bgcolor: 'black', color: 'white' } }}>Home</MenuItem>
        <MenuItem onClick={handleClose} component={Link} to="/about" sx={{ '&:hover': { bgcolor: 'black', color: 'white' } }}>About</MenuItem>
        <MenuItem onClick={handleClose} component={Link} to="/contact" sx={{ '&:hover': { bgcolor: 'black', color: 'white' } }}>Contact us</MenuItem>
        <MenuItem onClick={handleClose} component={Link} to="/homepage" sx={{ '&:hover': { bgcolor: 'black', color: 'white' } }}>Log in</MenuItem>
        <MenuItem onClick={handleClose} component={Link} to="/homepage" sx={{ '&:hover': { bgcolor: 'black', color: 'white' }, asButton: true }}>Sign up</MenuItem>
      </Menu>
      <div className='navBarCenter'>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/about">About</NavLink>
        <NavLink to="/contact">Contact us</NavLink>
      </div>
      <div className='buttonContainer'>
        <NavLink to="/homepage">Log in</NavLink>
        <NavLink to="/homepage" asButton={true}>Sign up</NavLink>
      </div>
    </div>
  );
}
