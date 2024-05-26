import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getUserMainData } from '../services/apiService.js';

const Header = () => {
    const [userFirstName, setUserFirstName] = useState('');
    const { userId } = useParams(); // Extraire userId à partir des paramètres de l'URL

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                // Tente d'obtenir les données de l'utilisateur depuis l'API
                const userData = await getUserMainData(userId);
                setUserFirstName(userData.data.userInfos.firstName);
            } catch (error) {
                // En cas d'erreur, affiche un message vide
                console.log('Error fetching user data:', error);
                setUserFirstName('');
            }
        };

        fetchUserData();
    }, [userId]);

    return (
        <div className='header'>
            <h1>Bonjour <span className="red">{userFirstName}</span></h1>
            <p>Félicitations ! Vous avez explosé vos objectifs hier 👏</p>
        </div>
    );
};

export default Header;
