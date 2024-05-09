import React from 'react';
import Nav from '../components/Nav';
import Asside from '../components/Asside';

const ErrorComponent = () => {
  return (
    <div className='main'>
    <Nav />
    <div className='flex'>
        <Asside />
        <div className='flex4'>      <h1>Utilisateur introuvable</h1>
      <p>Le profil de l'utilisateur que vous recherchez n'existe pas.</p>
      <p>Veuillez vérifier l'URL ou revenir à la page d'accueil.</p>
    </div>
    </div>
    </div>
  );
};

export default ErrorComponent;