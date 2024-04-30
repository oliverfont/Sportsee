import React from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer } from 'recharts';
import './styles/radarChart.css';

const RadarPerformanceChart = ({ data }) => {
  // Vérifiez si les données sont disponibles
  if (!data || !data.length) {
    return <div>Loading...</div>;
  }

  const performanceNames = {
    1: 'cardio',
    2: 'energy',
    3: 'endurance',
    4: 'strength',
    5: 'speed',
    6: 'intensity'
  };

  const formattedData = data.map(item => ({
    kind: performanceNames[item.kind],
    value: item.value
  })).sort((a, b) => a.kind === 'intensity' ? -1 : b.kind === 'intensity' ? 1 : 0);

  return (
    <div className='radar-chart'>
      <ResponsiveContainer width="100%" height={300}>
        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={formattedData}>
          <PolarGrid radialLines={false} strokeWidth={2} />
          <Radar name="Performance" dataKey="value" fill="#8884d8" fillOpacity={0.8} style={{ fill: 'rgba(255, 1, 1, 0.70)' }} />
          <PolarAngleAxis dataKey="kind" tick={{ fill: 'white', fontWeight: 'bold', dy: 5 }} tickLine={false} />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default RadarPerformanceChart;
