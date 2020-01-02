import React from 'react';
import { NavLink } from 'react-router-dom';
import './MainNavigation.css';

const mainNavigation = props => (
    <header className="main-nav">
        <div className="main-nav-logo">
            <h1>LAB-go</h1>
        </div>
        <nav className="main-nav-items">
            <ul>
                <li>
                    
                    <NavLink to="/auth"><i class="fa fa-fw fa-user"></i> Authenticate </NavLink>
                </li>
                <li>
                    <NavLink to="/events"> Events </NavLink>
                </li>
                <li>
                    <NavLink to="/bookings"> Bookings </NavLink>
                </li>
                <li>
                    <NavLink to="/students"><i class="fa fa-fw fa-users"></i> Students </NavLink>
                </li>
                <li>
                    <NavLink to="/checkingouts"><i class="fa fa-fw fa-book"></i> Checkingouts </NavLink>
                </li>
                <li>
                    <NavLink to="/assets"><i class="fa fa-fw fa-wrench"></i> Assets </NavLink>
                </li>
            </ul>
        </nav>
    </header>

);

export default mainNavigation;