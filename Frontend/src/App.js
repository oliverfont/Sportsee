import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Activity from './components/bartChart.js'; // Importe le composant MyBarChart que tu as créé
import AverageSession from './components/lineChart.js';
import RadarPerformanceChart from './components/radarChart.js';
import KpiScore from './components/kpiScore.js';
import Header from './components/Header.js';
import Nutri from './components/Nutri.js';
import Nav from './components/Nav.js';
import Asside from './components/Asside.js';
import './App.css';

const App = () => {
  const [userData, setUserData] = useState(null);
  const userId = 18;

  useEffect(() => {
    // Effectuer une requête GET pour récupérer les données de l'utilisateur à partir de votre API
    axios.get(`http://localhost:3000/user/${userId}`)
      .then(response => {
        // Mettre à jour l'état avec les données reçues de l'API
        setUserData(response.data);
      })
      .catch(error => {
        console.error('Error fetching user data:', error);
      });
  }, [userId]); // Exécuter cette requête à chaque fois que userId change

  if (!userData) {
    // Afficher un message de chargement tant que les données ne sont pas disponibles
    return <div>Loading...</div>;
  }

  return (
    <div className='main'>
      <Nav />
      <div className='flex'>
        <Asside />
        <div className='flex4'>
          <Header userId={userId} />
          <div className='flex3'>
            <div className='flex1'>
              <Activity data={userData.activity} />
              <div className='flex2'>
                <AverageSession data={userData.averageSessions} />
                <RadarPerformanceChart data={userData.performance} />
                <KpiScore score={userData.score} />
              </div>
            </div>
            <Nutri data={userData.keyData} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
