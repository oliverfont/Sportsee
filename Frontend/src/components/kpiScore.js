import React from 'react';
import { ResponsiveContainer, RadialBarChart, RadialBar, Legend } from 'recharts';
import './styles/kpiScore.css';

const KpiScore = ({ score }) => {
  // Calcul du pourcentage de score (0 à 100)
  const percentage = score * 100;

  return (
    <div className="kpi-score-container">
      <div className="kpi-score-circle" style={{ '--percentage': percentage + '%' }}>
        <span className="kpi-score-text">{percentage}% de votre objectif</span>
      </div>
    </div>
  );
};

export default KpiScore;
