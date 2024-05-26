import React, { useEffect, useState } from 'react';
import { ResponsiveContainer, Radar, RadarChart, PolarGrid, PolarAngleAxis } from 'recharts';
import { getUserPerformance } from '../services/apiService';
import './styles/radarChart.css';
import { PerformanceFormatter } from '../mock/dataFormat';

const Performance = ({ userId }) => {
  const [performanceData, setPerformanceData] = useState(null);

  useEffect(() => {
    const fetchPerformanceData = async () => {
      try {
        const userData = await getUserPerformance(userId);
        setPerformanceData(userData.data);
      } catch (error) {
        console.log('Error fetching performance data:', error);
        setPerformanceData(null);
      }
    };

    fetchPerformanceData();
  }, [userId]);

  if (!performanceData) return <div>Loading performance...</div>;

  const formattedData = PerformanceFormatter.formatPerformanceData(performanceData);

  return (
    <div style={{ overflow: 'hidden', padding: '0 10px', borderRadius: '5px', background: '#282D30', width: '100%', height: '300px', margin: 'auto' }}>
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={formattedData}>
          <PolarGrid radialLines={false} strokeWidth={2} />
          <Radar name="Performance" dataKey="value" fill="#8884d8" fillOpacity={0.8} style={{ fill: 'rgba(255, 1, 1, 0.70)' }} />
          <PolarAngleAxis dataKey="kind" tick={{ fill: 'white', fontWeight: 'bold', dy: 5 }} tickLine={false} />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Performance;
