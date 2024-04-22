import React from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis } from 'recharts';

const Performance = ({ data }) => {
  // Définir une liste de noms de performances correspondant aux clés dans les données
  const performanceNames = {
    1: 'cardio',
    2: 'energy',
    3: 'endurance',
    4: 'strength',
    5: 'speed',
    6: 'intensity'
  };

  // Mapper les données pour remplacer les clés par les noms correspondants
  const formattedData = data.map(item => ({
    kind: performanceNames[item.kind],
    value: item.value
  }));

  return (
    <RadarChart style={{ borderRadius: 5, background: '#282D30' }} cx={300} cy={250} outerRadius={150} width={600} height={500} data={formattedData}>
      <PolarGrid radialLines={false} strokeWidth={2} />
      <Radar name="Performance" dataKey="value" fill="#8884d8" fillOpacity={0.8} style={{ fill: 'rgba(255, 1, 1, 0.70)' }} />
      <PolarAngleAxis dataKey="kind" tick={{ fill: 'white', fontWeight: 'bold', dy: 5 }} tickLine={false} />
    </RadarChart>
  );
};

export default Performance;
