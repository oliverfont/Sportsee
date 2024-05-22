import React, { useEffect, useRef, useState } from 'react';
import { ResponsiveContainer, Radar, RadarChart, PolarGrid, PolarAngleAxis } from 'recharts';
import { getUserPerformance } from '../sevices/apiService';
import { USER_PERFORMANCE } from '../mock/dataMock';
import './styles/radarChart.css';
import { PerformanceFormatter } from '../mock/dataFormat';

const Performance = ({ userId }) => {
  // State pour stocker les données
  const [performanceData, setPerformanceData] = useState(null);
  // Référence pour accéder au conteneur du graphique
  const chartRef = useRef(null);

  // Effet pour récupérer les données
  useEffect(() => {
    const fetchPerformanceData = async () => {
      try {
        const userData = await getUserPerformance(userId); // Récupération des données via le service API
        setPerformanceData(userData.data); // Mise à jour des données
      } catch (error) {
        console.log('Error fetching performance data:', error);
        const userPerformanceFromMock = USER_PERFORMANCE.find(user => user.userId === parseInt(userId));
        if (userPerformanceFromMock) {
          setPerformanceData({ kind: userPerformanceFromMock.kind, data: userPerformanceFromMock.data }); // Utilisation des données de mock en cas d'erreur
        } else {
          setPerformanceData(null);
        }
      }
    };

    fetchPerformanceData(); // Appel de la fonction de récupération des données
  }, [userId]); // Déclenchement de l'effet lorsque l'ID utilisateur change

  // Effet pour mettre à jour la taille du graphique en cas de redimensionnement de la fenêtre
  useEffect(() => {
    const updateChartSize = () => {
      if (chartRef.current) {
        const { height } = chartRef.current.getBoundingClientRect();
        chartRef.current.style.height = `${height}px`;
      }
    };

    window.addEventListener('resize', updateChartSize);
    updateChartSize();

    return () => {
      window.removeEventListener('resize', updateChartSize);
    };
  }, []);

  // Affichage d'un message de chargement si les données ne sont pas disponibles
  if (!performanceData) return <div>Loading performance...</div>;

  // Formatage des données de performance pour les utiliser dans le graphique
  const formattedData = PerformanceFormatter.formatPerformanceData(performanceData);

  // Rendu du composant Performance
  return (
    <div style={{ overflow: 'hidden', padding: '0 10px', borderRadius: '5px', background: '#282D30', width: '100%', height: '300px', margin: 'auto' }} ref={chartRef}>
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={formattedData}>
          <PolarGrid radialLines={false} strokeWidth={2} />
          <Radar name="Performance" dataKey="value" fill="#8884d8" fillOpacity={0.8} style={{ fill: 'rgba(255, 1, 1, 0.70)' }} />
          <PolarAngleAxis dataKey="kind" tick={{ fill: 'white', fontWeight: 'bold', dy: 5 }} tickLine={false} />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Performance;
