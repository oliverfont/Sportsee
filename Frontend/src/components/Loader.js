import React from 'react';

const Loader = () => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', marginTop: '-100px' }}>
    <p>The API seems to be unavailable, we are attempting to load data from the latest local backups</p>
    <div className="loader">
      <div></div>
      <div></div>
      <div></div>
    </div>
  </div>
  );
};

export default Loader;
