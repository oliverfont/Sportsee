import React, { useState, useEffect } from 'react';
import { getUserDataById } from '../sevices/apiService.js';
import './styles/Header.css';

const Header = ({ userId }) => {
    const [userFirstName, setUserFirstName] = useState('');

    useEffect(() => {
        // Fonction pour récupérer les données de l'utilisateur depuis l'API
        const fetchUserData = async () => {
            try {
                const userData = await getUserDataById(userId);
                setUserFirstName(userData.userInfos.firstName);
            } catch (error) {
                console.error('Error fetching user data:', error);
                setUserFirstName('');
            }
        };

        // Appel de la fonction pour récupérer les données de l'utilisateur
        fetchUserData();
    }, [userId]); // Exécuter l'effet à chaque fois que userId change

    return (
        <div className='header'>
            <h1>Bonjour <span className="red">{userFirstName}</span></h1>
            <p>Félicitation ! Vous avez explosé vos objectifs hier 👏</p>
        </div>
    );
};

export default Header;
