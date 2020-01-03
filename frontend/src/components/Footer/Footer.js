import React from 'react';
// import { NavLink} from 'react-router-dom';
import './Footer.css';


const footer = props => (
    <footer className="footer">
        <div className="footer-logo">
            <h1>LAB-go</h1>
        </div>
        <nav className="footer-items">
            <ul>   
            
                <li><a href="https://github.com/MUYANGGUO/lab-management-gatech" ><i className="fa fa-fw fa-github"></i>:  Follow the project @ Github </a></li>
                <li><a href="https://www.linkedin.com/in/muyang-guo-445a3465/" ><i className="fa fa-fw fa-linkedin"></i>:  Author: Muyang Guo </a></li>
                <label>Version: 1.0</label>
            </ul>
            
        </nav>
    </footer>

);

export default footer;