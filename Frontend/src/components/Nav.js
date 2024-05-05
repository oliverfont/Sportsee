// Nav.jsx

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/Group(1).svg';
import logoText from '../assets/Group.svg';
import './styles/Nav.css';

const Nav = ({ selectedUserId }) => {
    // Utiliser l'ID sélectionné ou récupérer le dernier ID du stockage local
    const [lastSelectedProfile, setLastSelectedProfile] = useState(selectedUserId || localStorage.getItem('lastSelectedProfile'));

    // Fonction pour mettre à jour l'ID du dernier profil sélectionné
    const handleProfileSelect = (userId) => {
        setLastSelectedProfile(userId);
        // Enregistrer l'ID du profil sélectionné dans le stockage local
        localStorage.setItem('lastSelectedProfile', userId);
    };

    return (
        <div className='nav'>
            <div className='logo'>
                <img src={logo} alt='logo' />
                <img src={logoText} alt='logo-text' />
            </div>
            <nav>
                <ul>
                    <li><Link to='/'>Accueil</Link></li>
                    <li>
                        <Link
                            to={`/profile/${lastSelectedProfile}`} 
                            onClick={() => handleProfileSelect(lastSelectedProfile)} // Mise à jour ici
                            className={lastSelectedProfile ? 'active' : ''}
                        >
                            Profil
                        </Link>
                    </li>
                    <li><Link to='/settings'>Réglage</Link></li>
                    <li><Link to='/community'>Communauté</Link></li>
                </ul>
            </nav>
        </div>
    );
};

export default Nav;
