import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'; // Importer useParams depuis react-router-dom
import { getUserMainData } from '../sevices/apiService.js';
import './styles/Header.css';

const Header = () => {
    const [userFirstName, setUserFirstName] = useState('');
    const { userId } = useParams(); // Extraire userId à partir des paramètres de l'URL

    useEffect(() => {
        // Fonction pour récupérer les données de l'utilisateur depuis l'API
        const fetchUserData = async () => {
            try {
                const userData = await getUserMainData(userId); // Utilisation de getUserMainData avec userId
                setUserFirstName(userData.data.userInfos.firstName);
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
