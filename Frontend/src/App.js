import React from 'react';
import { USER_MAIN_DATA, USER_ACTIVITY, USER_AVERAGE_SESSIONS, USER_PERFORMANCE } from './mock/dataMock.js'; // Importe les données USER_ACTIVITY depuis le fichier dataMock.js
import Activity from './components/bartChart.js'; // Importe le composant MyBarChart que tu as créé
import AverageSession from './components/lineChart.js';
import RadarPerformanceChart from './components/radarChart.js';
import KpiScore from './components/kpiScore.js';

const App = () => {
  const userId = 12;

  // Filtrer les données pour l'utilisateur actuel en fonction de son userId
  const userData = USER_MAIN_DATA.find(user => user.id === userId);
  const userMainData = USER_MAIN_DATA.find(mainData => mainData.id === userId);
  const userActivityData = USER_ACTIVITY.find(activity => activity.userId === userId);
  const userAverageSessionsData = USER_AVERAGE_SESSIONS.find(session => session.userId === userId);
  const userPerformanceData = USER_PERFORMANCE.find(performance => performance.userId === userId);

  return (
    <div>
      <h1>My Application</h1>
      
      {/* Composant Activity avec les données USER_ACTIVITY */}
      <Activity data={USER_ACTIVITY.find(activity => activity.userId === userId)?.sessions} />
      
      {/* Composant AverageSession avec les données USER_AVERAGE_SESSIONS */}
      <AverageSession data={USER_AVERAGE_SESSIONS.find(session => session.userId === userId)?.sessions} />
      
      {/* Composant RadarPerformanceChart avec les données USER_PERFORMANCE */}
      <RadarPerformanceChart data={USER_PERFORMANCE.find(performance => performance.userId === userId)?.data} />
      
      {/* Composant KpiScore avec une valeur de score de USER_MAIN_DATA */}
      <KpiScore score={USER_MAIN_DATA.find(user => user.id === userId)?.score} />
    </div>
  );
  
};


export default App;
