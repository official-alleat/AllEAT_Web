import React from 'react';
import { Link } from 'react-router-dom';
import './Navigation.css';

export default function Navigation() {
  const handleClick = () => {
    localStorage.removeItem('menuData');
  };

  return (
    <div className="navigation">
      <div className="nav-title-container">
        <Link to="/" onClick={handleClick}>
          올잇
        </Link>
      </div>
    </div>
  );
}