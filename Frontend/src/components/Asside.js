import React from'react';
import './styles/Asside.css';
import hippi from '../assets/iconhippi.svg';
import swim from '../assets/iconswim.svg';
import bike from '../assets/iconbike.svg';
import alter from '../assets/iconalter.svg';
import copyright from '../assets/Copiryght.svg';

const Asside = () => {
    return (
        <div className='asside'>
            <ul>
                <li>
                    <a href='#'><img src={hippi} alt='hippi' /></a>
                </li>
                <li>
                <a href='#'><img src={swim} alt='swim' /></a>
                </li>
                <li>
                <a href='#'><img src={bike} alt='bike' /></a>
                </li>
                <li>
                <a href='#'><img src={alter} alt='alter' /></a>
                </li>
            </ul>
            <img style={{margin: '60px'}} src={copyright} alt='copyright' />
        </div>
    );
};

export default Asside;