import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Nav from '../components/Nav';
import Asside from '../components/Asside';

const SettingsPage = ({ toggleApiData }) => {
  const [useMockData, setUseMockData] = useState(false);

  const handleToggleApi = () => {
    setUseMockData(false);
    toggleApiData(false); // Appel de la fonction parent pour utiliser les données de l'API
  };

  const handleToggleMock = () => {
    setUseMockData(true);
    toggleApiData(true); // Appel de la fonction parent pour utiliser les données du mock
  };

  return (
    <div className='main'>
      <Nav />
      <div className='flex'>
        <Asside />
        <div className='flex4'>
          <h1>Page Réglages</h1>
          <p>Utiliser les données de l'API : {useMockData ? 'Non' : 'Oui'}</p>
          <button onClick={handleToggleApi}>Utiliser l'API</button>
          <button onClick={handleToggleMock}>Utiliser le Mock</button>
          <Link to="/">Retour à l'accueil</Link>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
