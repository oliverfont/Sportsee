import React, { useRef, useEffect, useState } from 'react';
import { ResponsiveContainer, Radar, RadarChart, PolarGrid, PolarAngleAxis } from 'recharts';
import { getUserPerformance } from '../sevices/apiService'; // Importer la fonction pour récupérer les données depuis le service API
import './styles/radarChart.css';

const Performance = ({ userId }) => { // Récupérer userId depuis les props
  const [formattedData, setFormattedData] = useState([]);
  const chartRef = useRef(null);
  const [chartSize, setChartSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const performanceData = await getUserPerformance(userId); // Utiliser userId pour récupérer les données de performance
        // Mettre à jour l'état avec les données récupérées
        setFormattedData(performanceData);
      } catch (error) {
        console.error('Error fetching performance data:', error);
      }
    };

    fetchData();
  }, [userId]); // Utiliser userId comme dépendance pour recharger les données lorsque userId change

  useEffect(() => {
    const updateChartSize = () => {
      if (chartRef.current) {
        const { width, height } = chartRef.current.getBoundingClientRect();
        setChartSize({ width, height });
      }
    };

    window.addEventListener('resize', updateChartSize);
    updateChartSize();

    return () => {
      window.removeEventListener('resize', updateChartSize);
    };
  }, []);

  return (
    <div style={{ overflow: 'hidden', padding: '0 10px', borderRadius: '5px', background: '#282D30', width: '100%', height: '300px', margin: 'auto' }} ref={chartRef}>
      <ResponsiveContainer width={chartSize.width} height={chartSize.height}>
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
