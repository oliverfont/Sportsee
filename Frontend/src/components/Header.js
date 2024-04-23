import React from'react';
import { USER_MAIN_DATA } from '../mock/dataMock';
import './styles/Header.css';

const infoUser = USER_MAIN_DATA.find(user => user.id === 18);
const userInfo = infoUser.userInfos;

const Header = () => {
    return (
        <div className='header'>
            <h1>Bonjour {userInfo.firstName}</h1>
            <p>Félicitation ! Vous avez explosé vos objectifs hier 👏</p>
        </div>
    );
};

export default Header;