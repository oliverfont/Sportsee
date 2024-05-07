import React, { useState, useEffect } from 'react';
import { getUserMainData } from '../sevices/apiService.js';
import { USER_MAIN_DATA } from '../mock/dataMock.js';
import { ResponsiveContainer, RadialBarChart, RadialBar } from 'recharts';
import './styles/kpiScore.css';

const KpiScore = ({ userId }) => {
  const [score, setScore] = useState(null);

  useEffect(() => {
    const fetchScore = async () => {
      try {
        const userData = await getUserMainData(userId);
        const userScore = userData && userData.data && userData.data.score;
        setScore(userScore);
      } catch (error) {
        console.error('Error fetching user score:', error);
        const userMainDataFromMock = USER_MAIN_DATA.find(user => user.id === parseInt(userId));
        if (userMainDataFromMock) {
          setScore(userMainDataFromMock.score);
        } else {
          setScore(null);
        }
      }
    };

    fetchScore();
  }, [userId]);

  if (score === null) return <div>Loading score...</div>;

  const percentage = score * 100;
  const endAngle = (percentage * 3.6) - 180; 
  const data = [{ name: 'Score', value: percentage }];

  return (
    <div style={{ padding: '0 10px', borderRadius: '5px', background: '#FBFBFB', width: '100%', height: '300px' }}>
      <ResponsiveContainer width="100%" height="100%">
        <RadialBarChart
          innerRadius="50%"
          outerRadius="60%"
          data={data}
          startAngle={222}
          endAngle={-endAngle + 44}
        >
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
