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
                    <img src={hippi} alt='hippi' />
                </li>
                <li>
                    <img src={swim} alt='swim' />
                </li>
                <li>
                    <img src={bike} alt='bike' />
                </li>
                <li>
                    <img src={alter} alt='alter' />
                </li>
            </ul>
            <img style={{margin: '60px'}} src={copyright} alt='copyright' />
        </div>
    );
};

export default Asside;