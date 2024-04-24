import React from 'react';
import { curveCardinal } from 'd3-shape';
import {
  LineChart,
  Line,
  XAxis,
  Tooltip,
  YAxis,
  ResponsiveContainer
} from 'recharts';
import './styles/LineChart.css';

const AverageSession = ({ data }) => {
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

  const averageSessionData = data.map(session => ({
    day: dayNames[session.day],
    sessionLength: session.sessionLength
  }));

  console.log('Formatted data:', averageSessionData);

  return (
    <div className='line-chart' style={{ overflow: 'hidden', padding: '0 10px', background: '#F00', borderRadius: '5px', width: '100%' }}>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={averageSessionData}>
          <defs>
            {/* Dégradé linéaire */}
            <linearGradient id="strokeGradient" x1="100%" y1="0%" x2="0%" y2="0%">
              <stop offset="0%" stopColor="#FFFFFF" stopOpacity={1} />
              <stop offset="40.32%" stopColor="#FFFFFF" stopOpacity={0.4} />
            </linearGradient>
          </defs>
          <XAxis dataKey="day" axisLine={false} tickLine={false} interval={0} tick={{ fill: '#FFFFFF', opacity: 0.6 }} dy={0} />
          <YAxis domain={[0, 120]} hide={true} />
          <Tooltip labelStyle={{ display: 'none' }} labelFormatter={() => null} formatter={(value) => value} itemStyle={{ color: '#000000' }} />
          <Line dot={false} type="basis" dataKey="sessionLength" curve={curveCardinal} stroke="url(#strokeGradient)" strokeWidth={2} />
          <text width={20} height={60} x="50%" y="60" fontSize={16} textAnchor="middle" fill="#FFFFFF" opacity={0.6} fontWeight={'bold'}>Durée moyenne des sessions</text>
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default AverageSession;
