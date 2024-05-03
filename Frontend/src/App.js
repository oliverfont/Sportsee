import React, { useState, useEffect } from 'react';
import { getUserMainData, getUserActivity, getUserAverageSessions, getUserPerformance } from './sevices/apiService.js';
import Activity from './components/bartChart.js'; // Modification du chemin d'importation
import AverageSession from './components/lineChart.js'; // Modification du chemin d'importation
import RadarPerformanceChart from './components/radarChart.js'; // Modification du chemin d'importation
import KpiScore from './components/kpiScore.js'; // Modification du chemin d'importation
import Header from './components/Header';
import Nutri from './components/Nutri';
import Nav from './components/Nav';
import Asside from './components/Asside';
import './App.css';

const App = () => {
  const [userData, setUserData] = useState({});
  const userId = 18;

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const mainData = await getUserMainData(userId);
        const activityData = await getUserActivity(userId);
        const averageSessionsData = await getUserAverageSessions(userId);
        const performanceData = await getUserPerformance(userId);

        setUserData({
          userInfo: mainData,
          activity: activityData,
          averageSessions: averageSessionsData,
          performance: performanceData
        });
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

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
              <Activity userId={userId} /> {/* Passer userId */}
              <div className='flex2'>
                <AverageSession userId={userId} /> {/* Passer userId */}
                <RadarPerformanceChart data={userData.performance} />
                <KpiScore score={userData.score} />
              </div>
            </div>
            {userData.userInfo && <Nutri data={userData.userInfo.keyData} />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
