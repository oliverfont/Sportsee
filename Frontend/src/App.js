import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Activity from './components/bartChart.js';
import AverageSession from './components/lineChart.js';
import RadarPerformanceChart from './components/radarChart.js';
import KpiScore from './components/kpiScore.js';
import Header from './components/Header';
import Nutri from './components/Nutri';
import Nav from './components/Nav';
import Asside from './components/Asside';
import Loader from './components/Loader';
import ErrorComponent from './components/ErrorComponent.js'; 
import { USER_MAIN_DATA } from './mock/dataMock.js'; // Importez les données du mock
import './App.css';

const App = () => {
  const { userId } = useParams();
  const [apiIsDown, setApiIsDown] = useState(false);
  const [userExists, setUserExists] = useState(true); 

  useEffect(() => {
    const checkApiStatus = async () => {
      try {
        const response = await fetch(`http://localhost:3000/user/${userId}`);
        if (!response.ok) {
          setApiIsDown(true);
        } 
      } catch (error) {
        console.error('Error checking API status:', error);
        setApiIsDown(true);
      }
    };

    checkApiStatus();
  }, [userId]);

  useEffect(() => {
    const checkUserExist = USER_MAIN_DATA.map(user => user.id);
    setUserExists(checkUserExist.includes(parseInt(userId)));
  }, [userId]);


  useEffect(() => {
    const timer = setTimeout(() => {
      setApiIsDown(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  if (apiIsDown) {
    return (
      <div className='main'>
        <Nav selectedUserId={userId} />
        <div className='flex'>
          <Asside />
          <div className='flex4'>
            <Loader />
          </div>
        </div>
      </div>
    );
  }
  
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

  return (
    <div className='main'>
      <Nav selectedUserId={userId} />
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
