import React from 'react';
import { ResponsiveContainer, RadialBarChart, RadialBar } from 'recharts';
import './styles/kpiScore.css';

const KpiScore = ({ score }) => {
  if (score === null) return <div>Loading score...</div>;

  const percentage = score * 100;
  const endAngle = (percentage * 3.6) - 180;
  const data = [{ name: 'Score', value: percentage }];

  return (
    <div style={{ padding: '0 10px', borderRadius: '5px', background: '#FBFBFB', width: '100%', height: '300px' }}>
      <ResponsiveContainer width="100%" height="100%">
        <RadialBarChart innerRadius="50%" outerRadius="60%" data={data} startAngle={222} endAngle={-endAngle + 44}>
          <RadialBar background dataKey="value" fill="#FF0000" cornerRadius={10} />
          <text x="20%" y="20%" fontWeight={'bold'}>Score</text>
          <text x="50%" y="50%" className="kpi-score-text">{percentage}%</text>
          <text x="50%" y="50%" className="kpi-score-text2">de votre objectif</text>
        </RadialBarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default KpiScore;
