import React from 'react';
import { ResponsiveContainer, RadialBarChart, RadialBar, Legend } from 'recharts';

const KpiScore = ({ score }) => {
  // Calcul du pourcentage de score (0 à 100)
  const percentage = score * 100;

  // Données pour le graphique
  const data = [
    { name: 'Score', score: percentage }
  ];

  return (
    <ResponsiveContainer width="100%" height={300}>
      <RadialBarChart innerRadius="10%" outerRadius="80%" data={data} startAngle={180} endAngle={0}>
        <RadialBar minAngle={15} label={{ fill: '#666', position: 'insideStart' }} background clockWise dataKey="score" />
        <Legend iconSize={10} width={120} height={140} layout="vertical" verticalAlign="middle" align="right" />
      </RadialBarChart>
    </ResponsiveContainer>
  );
};

export default KpiScore;
