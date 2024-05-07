import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getUserMainData } from '../sevices/apiService.js';
import { USER_MAIN_DATA } from '../mock/dataMock.js';
import './styles/Header.css';

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
                // En cas d'erreur, utilise les données de secours du mock
                console.error('Error fetching user data:', error);
                const userDataFromMock = USER_MAIN_DATA.find(user => user.id === parseInt(userId));
                if (userDataFromMock) {
                    setUserFirstName(userDataFromMock.userInfos.firstName);
                } else {
                    setUserFirstName('');
                }
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
