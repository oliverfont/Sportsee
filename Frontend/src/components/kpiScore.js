import React from 'react';
import { ResponsiveContainer, RadialBarChart, RadialBar, Legend } from 'recharts';

const KpiScore = ({ score }) => {
  // Assure-toi que le score est défini
  if (score === undefined) return null;

  // Données pour le graphique radial
  const data = [{ name: 'Score', value: score }];

  return (
    <ResponsiveContainer width="100%" height={400}>
      <RadialBarChart
        innerRadius="50%"
        outerRadius="80%"
        data={data}
        startAngle={180}
        endAngle={0}
      >
        <RadialBar background dataKey="value" fill="#8884d8" />
        <Legend iconSize={10} width={120} height={140} layout="vertical" verticalAlign="middle" align="right" />
        <text x="50%" y="50%" textAnchor="middle" dominantBaseline="middle" className="kpi-score-text">{score}% de votre objectif</text>
      </RadialBarChart>
    </ResponsiveContainer>
  );
};

export default KpiScore;
