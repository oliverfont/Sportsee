import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Activity from './components/bartChart.js';
import AverageSession from './components/lineChart.js';
import RadarPerformanceChart from './components/radarChart.js';
import KpiScore from './components/kpiScore.js';
import Header from './components/Header';
import Nutri from './components/Nutri';
import Nav from './components/Nav';
import Asside from './components/Asside';
import ErrorComponent from './components/ErrorComponent.js'; 
import { USER_MAIN_DATA, USER_ACTIVITY, USER_AVERAGE_SESSIONS, USER_PERFORMANCE } from './mock/dataMock';
import { SessionFormatter, PerformanceFormatter, NutriFormatter } from './mock/dataFormat';
import './App.css';

const App = () => {
  const { userId } = useParams();
  const [userExists, setUserExists] = useState(true);
  const [averageSessions, setAverageSessions] = useState(null);
  const [performanceData, setPerformanceData] = useState(null);
  const [nutriData, setNutriData] = useState(null);
  const [activityData, setActivityData] = useState(null);
  const [userName, setUserName] = useState('');
  const [score, setScore] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch user main data
        let userMainData = await axios.get(`http://localhost:3000/user/${userId}`);
        userMainData = userMainData.data.data;
        
        // Fetch user activity data
        let userActivity = await axios.get(`http://localhost:3000/user/${userId}/activity`);
        userActivity = userActivity.data.data;
        
        // Fetch user average sessions data
        let userAverageSessions = await axios.get(`http://localhost:3000/user/${userId}/average-sessions`);
        userAverageSessions = userAverageSessions.data.data;
        
        // Fetch user performance data
        let userPerformance = await axios.get(`http://localhost:3000/user/${userId}/performance`);
        userPerformance = userPerformance.data.data;

        // Format data
        setNutriData(NutriFormatter.formatNutriData(userMainData.keyData)); // Ensure keyData is passed to formatter
        setActivityData(userActivity.sessions); // Assuming this is already formatted properly
        setAverageSessions(SessionFormatter.formatSessionData({ data: userAverageSessions }));
        setPerformanceData(PerformanceFormatter.formatPerformanceData(userPerformance));
        setUserName(userMainData.userInfos.firstName);
        setScore(userMainData.score || userMainData.todayScore); // Ensure score is set

      } catch (error) {
        console.log('Error fetching data from API:', error);

        // If API fails, use mock data
        const mockMainData = USER_MAIN_DATA.find(user => user.id === parseInt(userId));
        const mockActivity = USER_ACTIVITY.find(user => user.userId === parseInt(userId));
        const mockAverageSessions = USER_AVERAGE_SESSIONS.find(user => user.userId === parseInt(userId));
        const mockPerformance = USER_PERFORMANCE.find(user => user.userId === parseInt(userId));

        // Format mock data
        setNutriData(NutriFormatter.formatNutriData(mockMainData.keyData)); // Ensure keyData is passed to formatter
        setActivityData(mockActivity.sessions); // Assuming this is already formatted properly
        setAverageSessions(SessionFormatter.formatSessionData({ data: mockAverageSessions }));
        setPerformanceData(PerformanceFormatter.formatPerformanceData(mockPerformance));
        setUserName(mockMainData.userInfos.firstName);
        setScore(mockMainData.score || mockMainData.todayScore); // Ensure score is set
      }
    };

    const checkUserExist = USER_MAIN_DATA.map(user => user.id);
    setUserExists(checkUserExist.includes(parseInt(userId)));

    if (checkUserExist.includes(parseInt(userId))) {
      fetchData();
    }
  }, [userId]);

  if (!userExists) {
    return (
      <div className='main'>
        <Nav selectedUserId={userId} />
        <div className='flex'>
          <Asside />
          <div className='flex4'>            
            <ErrorComponent />
          </div>
        </div>
      </div>
    );
  }

  if (!averageSessions || !performanceData || !nutriData || !activityData) {
    return <div>Loading data...</div>;
  }

  return (
    <div className='main'>
      <Nav selectedUserId={userId} />
      <div className='flex'>
        <Asside />
        <div className='flex4'>
          <Header userName={userName} />
          <div className='flex3'>
            <div className='flex1'>
              <Activity activityData={activityData} />
              <div className='flex2'>
                <AverageSession sessionData={averageSessions} />
                <RadarPerformanceChart performanceData={performanceData} />
                <KpiScore score={score} />
              </div>
            </div>
            <Nutri nutriData={nutriData} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
