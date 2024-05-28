import React from 'react';

const Header = ({ userName }) => {
  return (
    <div className='header'>
      <h1>Bonjour <span className="red">{userName}</span></h1>
      <p>Félicitations ! Vous avez explosé vos objectifs hier 👏</p>
    </div>
  );
};

export default Header;
