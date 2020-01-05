import React from 'react';
import { NavLink } from 'react-router-dom';
import './MainNavigation.css';
import AuthContext from '../../context/auth-context';


const mainNavigation = props => (

    <AuthContext.Consumer>
        {(context)=>{
            return (    <header className="main-nav">
            <div className="main-nav-logo">
                <h1>LAB-go</h1>
            </div>
            <nav className="main-nav-items">
                <ul>

                    <li>
                        <NavLink to="/events"> Notes </NavLink>
                    </li>

                    {context.token && (
                    <li>
                        <NavLink to="/bookings"> Bookings </NavLink>
                    </li>)}

                    <li>
                        <NavLink to="/students"><i className="fa fa-fw fa-users"></i> Students </NavLink>
                    </li>

                    {context.token && (
                    <li>
                        <NavLink to="/checkingouts"><i className="fa fa-fw fa-book"></i> Checkingouts </NavLink>
                    </li>
                    )}
                    <li>
                        <NavLink to="/assets"><i className="fa fa-fw fa-wrench"></i> Assets </NavLink>
                    </li>
                    {!context.token && (
                    <li>
                        <NavLink to="/auth"><i className="fa fa-fw fa-user"></i> Log in </NavLink>
                    </li>)}
                    {context.token && (
                    <li>
                        <button onClick={context.logout}><i className="fa fa-fw fa-user"></i>Sign out </button>
                    </li>
                    )}
                </ul>
            </nav>
        </header>
        );
        }}

    </AuthContext.Consumer>

);

export default mainNavigation;