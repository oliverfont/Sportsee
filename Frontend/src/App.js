import React from 'react';
import { USER_MAIN_DATA, USER_ACTIVITY, USER_AVERAGE_SESSIONS, USER_PERFORMANCE } from './mock/dataMock.js'; // Importe les données USER_ACTIVITY depuis le fichier dataMock.js
import Activity from './components/bartChart.js'; // Importe le composant MyBarChart que tu as créé
import AverageSession from './components/lineChart.js';
import RadarPerformanceChart from './components/radarChart.js';
import KpiScore from './components/kpiScore.js';
import Header from './components/Header.js';
import './App.css';

const App = () => {
  const userId = 18;

  // Filtrer les données pour l'utilisateur actuel en fonction de son userId
  const userData = USER_MAIN_DATA.find(user => user.id === userId);
  const userMainData = USER_MAIN_DATA.find(mainData => mainData.id === userId);
  const userActivityData = USER_ACTIVITY.find(activity => activity.userId === userId);
  const userAverageSessionsData = USER_AVERAGE_SESSIONS.find(session => session.userId === userId);
  const userPerformanceData = USER_PERFORMANCE.find(performance => performance.userId === userId);

  return (
    <div className='main'>
            <Header userData={userData} userMainData={userMainData} userActivityData={userActivityData} userAverageSessionsData={userAverageSessionsData} userPerformanceData={userPerformanceData} />
          <div className='flex1'>
            <Activity data={USER_ACTIVITY.find(activity => activity.userId === userId)?.sessions} />
            <div className='flex2'>
            <AverageSession data={USER_AVERAGE_SESSIONS.find(session => session.userId === userId)?.sessions} />
            <RadarPerformanceChart data={USER_PERFORMANCE.find(performance => performance.userId === userId)?.data} />
            <KpiScore score={USER_MAIN_DATA.find(user => user.id === userId)?.score} />
            </div>
          </div>
    </div>
  );
  
};


export default App;
