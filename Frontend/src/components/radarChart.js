import React from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer } from 'recharts';
import './styles/radarChart.css';

const RadarPerformanceChart = ({ data }) => {
  // Vérifiez si les données sont disponibles
  if (!data || !data.kind || !data.data) {
    return <div>Loading perf...</div>;
  }

  // Créer un tableau de données formatées pour le graphique radar
  const formattedData = data.data.map(item => ({
    kind: data.kind[item.kind], // Utilisation de data.kind pour associer les valeurs aux types de performances
    value: item.value
  }));

  return (
    <div className='radar-chart'>
      <ResponsiveContainer width="100%" height={300}>
        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={formattedData}>
          <PolarGrid radialLines={false} strokeWidth={2} />
          <Radar name="Performance" dataKey="value" fill="#8884d8" fillOpacity={0.8} />
          <PolarAngleAxis dataKey="kind" tick={{ fill: 'white', fontWeight: 'bold', dy: 5 }} tickLine={false} />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default RadarPerformanceChart;
