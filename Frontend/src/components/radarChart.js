import React from 'react';
import { ResponsiveContainer, Radar, RadarChart, PolarGrid, PolarAngleAxis } from 'recharts';
import './styles/radarChart.css';

const Performance = ({ performanceData }) => {
  if (!performanceData) return <div>Loading performance...</div>;

  return (
    <div style={{ overflow: 'hidden', padding: '0 10px', borderRadius: '5px', background: '#282D30', width: '100%', height: '300px', margin: 'auto' }}>
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={performanceData}>
          <PolarGrid radialLines={false} strokeWidth={2} />
          <Radar name="Performance" dataKey="value" fill="#8884d8" fillOpacity={0.8} style={{ fill: 'rgba(255, 1, 1, 0.70)' }} />
          <PolarAngleAxis dataKey="kind" tick={{ fill: 'white', fontWeight: 'bold', dy: 5 }} tickLine={false} />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Performance;
