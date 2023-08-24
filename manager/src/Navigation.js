import React from 'react';
import { Link } from 'react-router-dom';
import './Navigation.css';

export default function Navigation() {
  return (
    <div className="navigation">
      <div className="nav-title-container">
        <Link to="/">올잇 매니저</Link>
      </div>
    </div>
  );
}