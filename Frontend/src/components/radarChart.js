import React, { useRef, useEffect, useState } from 'react';
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

  const chartRef = useRef(null);
  const [chartSize, setChartSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const updateChartSize = () => {
      const { width, height } = chartRef.current.getBoundingClientRect();
      setChartSize({ width, height });
    };

    window.addEventListener('resize', updateChartSize);
    updateChartSize();

    return () => {
      window.removeEventListener('resize', updateChartSize);
    };
  }, []);

  const { width, height } = chartSize;
  const minSize = Math.min(width, height);

  return (
    <div style={{ borderRadius: '5px', background: '#282D30', width: '300px', height: '300px', margin: 'auto' }} ref={chartRef}>
      <RadarChart cx={minSize / 2} cy={minSize / 2} outerRadius={80} width={minSize} height={minSize} data={formattedData}>
        <PolarGrid radialLines={false} strokeWidth={2} />
        <Radar name="Performance" dataKey="value" fill="#8884d8" fillOpacity={0.8} style={{ fill: 'rgba(255, 1, 1, 0.70)' }} />
        <PolarAngleAxis dataKey="kind" tick={{ fill: 'white', fontWeight: 'bold', dy: 5 }} tickLine={false} />
      </RadarChart>
    </div>
  );
};

export default Performance;
