import React, { useState, useEffect } from 'react';
import { getUserMainData } from '../sevices/apiService'; // Importez la fonction pour récupérer les données de l'utilisateur depuis votre service API
import { USER_MAIN_DATA } from '../mock/dataMock'; // Importez les données du mock
import './styles/Header.css';

const Header = ({ userId }) => {
    const [userFirstName, setUserFirstName] = useState('');

    useEffect(() => {
        // Fonction pour récupérer les données de l'utilisateur depuis l'API
        const fetchUserData = async () => {
            try {
                const response = await getUserMainData(userId);
                const userData = response.data; // Données de l'utilisateur
                setUserFirstName(userData.firstName); // Mettre à jour le prénom de l'utilisateur
            } catch (error) {
                console.error('Error fetching user data:', error);
                // En cas d'erreur, utiliser les données du mock
                const userDataFromMock = USER_MAIN_DATA.find(user => user.id === userId);
                setUserFirstName(userDataFromMock?.userInfos?.firstName || ''); // Mettre à jour le prénom de l'utilisateur depuis le mock
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
