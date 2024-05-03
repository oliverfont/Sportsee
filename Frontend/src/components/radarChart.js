import React, { useRef, useEffect, useState } from 'react';
import { ResponsiveContainer, Radar, RadarChart, PolarGrid, PolarAngleAxis } from 'recharts';
import './styles/radarChart.css';

const Performance = ({ data }) => {
  const performanceNames = {
    1: 'cardio',
    2: 'energy',
    3: 'endurance',
    4: 'strength',
    5: 'speed',
    6: 'intensity'
  };

  // Réorganiser les données pour que "intensity" soit au début de la liste
  const formattedData = data && data.data && data.kind ? Object.keys(data.kind).map(key => ({
    kind: performanceNames[key],
    value: data.data.find(item => item.kind === parseInt(key))?.value || 0
  })).sort((a, b) => a.kind === 'intensity' ? -1 : b.kind === 'intensity' ? 1 : 0) : [];

  const chartRef = useRef(null);
  const [chartSize, setChartSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const updateChartSize = () => {
      if (chartRef.current) {
        const { width, height } = chartRef.current.getBoundingClientRect();
        setChartSize({ width, height });
      }
    };

    window.addEventListener('resize', updateChartSize);
    updateChartSize();

    return () => {
      window.removeEventListener('resize', updateChartSize);
    };
  }, [chartRef.current]);

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
