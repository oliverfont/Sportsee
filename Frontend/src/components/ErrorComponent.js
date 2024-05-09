import React from 'react';

const ErrorComponent = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
      <h1>Utilisateur introuvable</h1>
      <p>Le profil de l'utilisateur que vous recherchez n'existe pas.</p>
      <p>Veuillez vérifier l'URL ou retournez à la page d'accueil.</p>
    </div>
  );
};

export default ErrorComponent;
