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
import { USER_MAIN_DATA } from './mock/dataMock.js';
import './App.css';

const App = () => {
  // Récupération de l'ID utilisateur à partir des paramètres de l'URL
  const { userId } = useParams();
  // État pour suivre si l'API est hors service
  const [apiIsDown, setApiIsDown] = useState(false);
  // État pour vérifier si l'utilisateur existe
  const [userExists, setUserExists] = useState(true);

  // Utilisation d'un effet pour vérifier l'état de l'API
  useEffect(() => {
    const checkApiStatus = async () => {
      try {
        const response = await fetch(`http://localhost:3000/user/${userId}`);
        if (!response.ok) {
          // Si la réponse n'est pas OK, cela signifie que l'API est hors service
          setApiIsDown(true);
        } 
      } catch (error) {
        // En cas d'erreur, l'API est également considérée comme hors service
        console.log('Error checking API status:', error);
        setApiIsDown(true);
      }
    };

    checkApiStatus();
  }, [userId]);

  // Utilisation d'un effet pour vérifier si l'utilisateur existe dans les données mockées
  useEffect(() => {
    const checkUserExist = USER_MAIN_DATA.map(user => user.id);
    setUserExists(checkUserExist.includes(parseInt(userId)));
  }, [userId]);

  // Utilisation d'un effet pour réinitialiser l'état de l'API après 5 secondes
  useEffect(() => {
    const timer = setTimeout(() => {
      setApiIsDown(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  // Affichage du loader si l'API est hors service
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

  // Affichage du composant d'erreur si l'utilisateur n'existe pas
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

  // Affichage principal lorsque l'API est en service et que l'utilisateur existe
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
