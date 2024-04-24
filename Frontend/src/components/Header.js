import React from 'react';
import { USER_MAIN_DATA } from '../mock/dataMock';
import './styles/Header.css';

const Header = ({ userId }) => {
    // Récupérer les informations de l'utilisateur en fonction de l'identifiant
    const infoUser = USER_MAIN_DATA.find(user => user.id === userId);
    const userInfo = infoUser.userInfos;

    return (
        <div className='header'>
            <h1>Bonjour <span className="red">{userInfo.firstName}</span></h1>
            <p>Félicitation ! Vous avez explosé vos objectifs hier 👏</p>
        </div>
    );
};

export default Header;
