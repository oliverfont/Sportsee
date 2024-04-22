import React from 'react';
import { ResponsiveContainer, RadialBarChart, RadialBar, Legend } from 'recharts';

const KpiScore = ({ score }) => {
  // Assurez-vous que le score est défini
  if (score === undefined) return null;

  // Multipliez le score par 100 pour obtenir le pourcentage
  const percentage = score * 100;

  // Calculer l'angle de fin basé sur le pourcentage
  const endAngle = (percentage * 3.6) - 180; // Soustrayez 180 pour aligner l'angle avec le démarrage à 0

  // Données pour le graphique radial
  const data = [{ name: 'Score', value: percentage }];

  return (
    <ResponsiveContainer width="100%" height={300}>
      <RadialBarChart
        innerRadius="50%"
        outerRadius="60%"
        data={data}
        startAngle={222}
        endAngle={-endAngle + 44}
      >
        <RadialBar background dataKey="value" fill="#8884d8" />
        <Legend iconSize={10} width={120} height={140} layout="vertical" verticalAlign="middle" align="right" />
        <text x="50%" y="50%" textAnchor="middle" dominantBaseline="middle" className="kpi-score-text">{percentage}% de votre objectif</text>
      </RadialBarChart>
    </ResponsiveContainer>
  );
};

export default KpiScore;
