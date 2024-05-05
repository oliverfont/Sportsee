import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getUserMainData, getUserActivity, getUserAverageSessions, getUserPerformance } from './sevices/apiService.js';
import Activity from './components/bartChart.js';
import AverageSession from './components/lineChart.js';
import RadarPerformanceChart from './components/radarChart.js';
import KpiScore from './components/kpiScore.js';
import Header from './components/Header';
import Nutri from './components/Nutri';
import Nav from './components/Nav';
import Asside from './components/Asside';
import './App.css';

const App = () => {
  const [userData, setUserData] = useState(null);
  const { userId } = useParams(); // Utiliser useParams pour obtenir userId de l'URL

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

  // Vérifiez si userData est défini et si userData.userInfo est défini avant d'utiliser userData.userInfo
  const userInfo = userData && userData.userInfo;

  return (
    <div className='main'>
      <Nav selectedUserId={userId} /> {/* Passer l'ID sélectionné comme prop à Nav */}
      <div className='flex'>
        <Asside />
        <div className='flex4'>
          <Header userId={userId} />
          <div className='flex3'>
            <div className='flex1'>
              <Activity userId={userId} />
              <div className='flex2'>
                <AverageSession userId={userId} />
                <RadarPerformanceChart userId={userId} />
                <KpiScore userId={userId} />
              </div>
            </div>
            <Nutri userId={userId} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
