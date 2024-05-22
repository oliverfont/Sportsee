import React, { useState, useEffect } from 'react';
import { getUserAverageSessions } from '../sevices/apiService';
import { USER_AVERAGE_SESSIONS } from '../mock/dataMock';
import { LineChart, Line, XAxis, Tooltip, YAxis, ResponsiveContainer } from 'recharts';
import './styles/LineChart.css';
import { curveCardinal } from 'd3-shape';
import { SessionFormatter } from '../mock/dataFormat';

const AverageSession = ({ userId }) => {
  // State pour stocker les données
  const [sessionData, setSessionData] = useState(null);
  // State pour la largeur du masque de fond
  const [maskWidth, setMaskWidth] = useState('110%');

  // Effet pour récupérer les données
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getUserAverageSessions(userId); // Récupération des données via le service API
        setSessionData(data); // Mise à jour des données
      } catch (error) {
        console.log('Error fetching average session data:', error);
        const userAverageSessionsFromMock = USER_AVERAGE_SESSIONS.find(user => user.userId === parseInt(userId));
        if (userAverageSessionsFromMock) {
          setSessionData({ data: { sessions: userAverageSessionsFromMock.sessions } }); // Utilisation des données de mock en cas d'erreur
        } else {
          setSessionData(null);
        }
      }
    };

    fetchData(); // Appel de la fonction de récupération des données
  }, [userId]); // Déclenchement de l'effet lorsque l'ID utilisateur change

  // Affichage d'un message de chargement si les données ne sont pas disponibles
  if (!sessionData || !sessionData.data || !sessionData.data.sessions.length) {
    return <div>Loading session...</div>;
  }

  // Gestion du clic sur le masque de fond pour mettre à jour sa largeur
  const handleMaskClick = (e) => {
    const newWidth = e.nativeEvent.offsetX;
    setMaskWidth(`${newWidth}px`);
  };

  // Formatage des données de session pour les utiliser dans le graphique
  const formattedData = SessionFormatter.formatSessionData(sessionData, USER_AVERAGE_SESSIONS);

  // Composant personnalisé pour afficher les tooltips
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip">
          <p className="label">{`${payload[0].value} min`}</p>
        </div>
      );
    }
    return null;
  };

  // Rendu du composant AverageSession
  return (
    <div className='line-chart' style={{ background: 'linear-gradient(to left,#e60000, #F00)', overflow: 'hidden', padding: '0 10px', borderRadius: '5px', width: '100%' }} onClick={handleMaskClick}>
      <div className="mask" style={{ background: `#e60000`, position: 'relative', top: 0, left: 0, width: '100%', height: '110%' }}>
      <ResponsiveContainer left={-10} width="100%" height={300}>
          <div className="mask-background" style={{ position: 'absolute', top: 0, left: 0, width: maskWidth, height: '100%', background: `#F00`, zIndex: 0 }}></div>
          <LineChart data={formattedData}>
            <defs>
              <linearGradient id="strokeGradient" x1="100%" y1="0%" x2="0%" y2="0%">
                <stop offset="0%" stopColor="#FFFFFF" stopOpacity={1} />
                <stop offset="40.32%" stopColor="#FFFFFF" stopOpacity={0.4} />
              </linearGradient>
            </defs>
            <XAxis tick={{ fill: 'rgba(255, 255, 255, 0.7)' }} dataKey="day" axisLine={false} tickLine={false} interval={0} />            
            <YAxis domain={[0, 120]} hide={true} />
            <Tooltip content={<CustomTooltip />} itemStyle={{ color: '#000000', fontWeight: 'bold' }} />            
            <Line dx={-30} width={120} dot={false} type="basis" dataKey="sessionLength" curve={curveCardinal} stroke="url(#strokeGradient)" strokeWidth={2} />
            <text width={20} height={60} x="50%" y="60" fontSize={16} textAnchor="middle" fontWeight={'bold'} fill="rgba(255, 255, 255, 0.7)">Durée moyenne des sessions</text>
          </LineChart>
      </ResponsiveContainer>
      </div>
    </div>
  );
};

export default AverageSession;
