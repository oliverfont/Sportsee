import React, { useEffect, useRef, useState } from 'react';
import { ResponsiveContainer, Radar, RadarChart, PolarGrid, PolarAngleAxis } from 'recharts';
import { getUserPerformance } from '../sevices/apiService';
import { USER_PERFORMANCE } from '../mock/dataMock';
import './styles/radarChart.css';

const Performance = ({ userId }) => {
  const [performanceData, setPerformanceData] = useState(null);
  const chartRef = useRef(null);

  useEffect(() => {
    const fetchPerformanceData = async () => {
      try {
        const userData = await getUserPerformance(userId);
        setPerformanceData(userData.data);
      } catch (error) {
        console.error('Error fetching performance data:', error);
        const userPerformanceFromMock = USER_PERFORMANCE.find(user => user.userId === parseInt(userId));
        if (userPerformanceFromMock) {
          setPerformanceData({ kind: userPerformanceFromMock.kind, data: userPerformanceFromMock.data });
        } else {
          setPerformanceData(null);
        }
      }
    };

    fetchPerformanceData();
  }, [userId]);

  useEffect(() => {
    const updateChartSize = () => {
      if (chartRef.current) {
        const { height } = chartRef.current.getBoundingClientRect();
        chartRef.current.style.height = `${height}px`;
      }
    };

    window.addEventListener('resize', updateChartSize);
    updateChartSize();

    return () => {
      window.removeEventListener('resize', updateChartSize);
    };
  }, []);

  if (!performanceData) return <div>Loading performance...</div>;

  const performanceNames = {
    1: 'cardio',
    2: 'Energie',
    3: 'Endurance',
    4: 'Force',
    5: 'Vitesse',
    6: 'Intensité'
  };

  const formattedData = Object.keys(performanceData.kind).map(key => ({
    kind: performanceNames[key],
    value: performanceData.data.find(item => item.kind === parseInt(key))?.value || 0
  })).sort((a, b) => a.kind === 'Intensité' ? -1 : b.kind === 'Intensité' ? 1 : 0);

  return (
    <div style={{ overflow: 'hidden', padding: '0 10px', borderRadius: '5px', background: '#282D30', width: '100%', height: '300px', margin: 'auto' }} ref={chartRef}>
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
