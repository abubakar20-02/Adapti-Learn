import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Button from '../../button'; // Adjust the import path as needed

function NavLink({ to, asButton, children, className, boldWhenActive = true, ...props }) {
  const navigate = useNavigate();
  const location = useLocation();

  const handleClick = (e) => {
    e.preventDefault();
    navigate(to);
  };

  const isActive = location.pathname === to;
  const activeStyle = {
    fontWeight: isActive && boldWhenActive ? 'bold' : 'normal',
    color: '#000',
    textDecoration: 'none',
  };

  if (asButton) {
    return (
      <Button onClick={handleClick} className={className} {...props} style={activeStyle}>
        {children}
      </Button>
    );
  } else {
    return (
      <a href={to} onClick={handleClick} className={className} style={{ ...activeStyle, ...props.style }} {...props}>
        {children}
      </a>
    );
  }
}

export default NavLink;
