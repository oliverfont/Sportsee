import React, { useState, useEffect } from 'react';
import { getUserDataById, getUserActivityById, getUserKeyDataById } from './sevices/apiService.js';
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
  const [userData, setUserData] = useState({});
  const userId = 18; // Vous pouvez spécifier l'ID de l'utilisateur ici

  useEffect(() => {
    // Fonction pour récupérer et mettre à jour les données de l'utilisateur
    const fetchUserData = async () => {
      try {
        const userDataResponse = await getUserDataById(userId);
        const activityDataResponse = await getUserActivityById(userId);
        const keyDataResponse = await getUserKeyDataById(userId);

        setUserData({
          userInfo: userDataResponse,
          activity: activityDataResponse,
          keyData: keyDataResponse
        });
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    // Appeler la fonction pour récupérer les données de l'utilisateur lors du montage du composant
    fetchUserData();
  }, [userId]);

  return (
    <div className='main'>
      <Nav />
      <div className='flex'>
        <Asside />
        <div className='flex4'>
          <Header userId={userId} />
          <div className='flex3'>
            <div className='flex1'>
              {/* Vérifiez si les données de l'utilisateur sont disponibles avant de passer les props */}
              {userData.activity && (
                <Activity data={userData.activity} />
              )}
              <div className='flex2'>
                {userData.activity && (
                  <AverageSession data={userData.averageSessions} />
                )}
                {userData.activity && (
                  <RadarPerformanceChart data={userData.performance} />
                )}
                {userData.userInfo && (
                  <KpiScore score={userData.userInfo.score} />
                )}
              </div>
            </div>
            {userData.keyData && (
              <Nutri data={userData.keyData} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;