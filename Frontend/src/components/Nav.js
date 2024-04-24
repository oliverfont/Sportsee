import React from'react';
import logo from '../assets/Group(1).svg';
import logoText from '../assets/Group.svg';
import './styles/Nav.css';

const Nav = () => {
    return (
        <div className='nav'>
            <div className='logo'>
            <img src={logo} alt='logo' />
            <img src={logoText} alt='logo-text' />
            </div>
        <nav>
            <ul>
                <li><a href='#'>Acceuil</a></li>
                <li><a href='#'>Profil</a></li>
                <li><a href='#'>Réglage</a></li>
                <li><a href='#'>Communauté</a></li>
            </ul>
        </nav>
        </div>
    );
};

export default Nav;