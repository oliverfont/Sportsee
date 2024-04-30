import React from 'react';
import { LineChart, Line, XAxis, Tooltip, YAxis, ResponsiveContainer } from 'recharts';
import './styles/LineChart.css';

const AverageSession = ({ data }) => {
  
  // Vérifiez si les données sont disponibles
  if (!data || !data.length) {
    return <div>Loading...</div>;
  }

  console.log('Data received:', data);

  const dayNames = {
    1: 'L',
    2: 'M',
    3: 'M',
    4: 'J',
    5: 'V',
    6: 'S',
    7: 'D'
  };

  const formattedData = data.map(session => ({
    day: dayNames[session.day],
    sessionLength: session.sessionLength
  }));

  console.log('Formatted data:', formattedData);

  return (
    <div className='line-chart'>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={formattedData}>
          <XAxis dataKey="day" axisLine={false} tickLine={false} interval={0} tick={{ fill: '#FFFFFF', opacity: 0.6 }} dy={0} />
          <YAxis domain={[0, 120]} hide={true} />
          <Tooltip labelStyle={{ display: 'none' }} labelFormatter={() => null} formatter={(value) => value} itemStyle={{ color: '#000000' }} />
          <Line dot={false} type="basis" dataKey="sessionLength" stroke="#FFFFFF" strokeWidth={2} />
          <text width={20} height={60} x="50%" y="60" fontSize={16} textAnchor="middle" fill="#FFFFFF" opacity={0.6} fontWeight={'bold'}>Durée moyenne des sessions</text>
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default AverageSession;
