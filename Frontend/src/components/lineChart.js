import React, { useState, useEffect } from 'react';
import { getUserAverageSessions } from '../sevices/apiService';
import { USER_AVERAGE_SESSIONS } from '../mock/dataMock';
import { LineChart, Line, XAxis, Area, Tooltip, YAxis, ResponsiveContainer } from 'recharts';
import './styles/LineChart.css';
import { curveCardinal } from 'd3-shape'; 

const AverageSession = ({ userId }) => {
  const [sessionData, setSessionData] = useState(null);
  const [mouseX, setMouseX] = useState(null); // Position X de la souris

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getUserAverageSessions(userId); 
        setSessionData(data);
      } catch (error) {
        console.error('Error fetching average session data:', error);
        const userAverageSessionsFromMock = USER_AVERAGE_SESSIONS.find(user => user.userId === parseInt(userId));
        if (userAverageSessionsFromMock) {
          setSessionData({ data: { sessions: userAverageSessionsFromMock.sessions } });
        } else {
          setSessionData(null);
        }
      }
    };

    fetchData();
  }, [userId]);

  if (!sessionData || !sessionData.data || !sessionData.data.sessions.length) {
    return <div>Loading session...</div>;
  }

  const handleMouseMove = (e) => {
    setMouseX(e.nativeEvent.offsetX);
  };

  const dayNames = {
    0: 'D',
    1: 'L',
    2: 'M',
    3: 'M',
    4: 'J',
    5: 'V',
    6: 'S',
    7: 'D',
    8: 'L'
  };

  const formattedData = sessionData.data.sessions.map(session => ({
    day: dayNames[session.day],
    sessionLength: session.sessionLength
  }));

  return (
    <div className='line-chart' style={{ overflow: 'hidden', padding: '0 10px', background: '#F00', borderRadius: '5px', width: '100%' }} onMouseMove={handleMouseMove}>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={formattedData}>
          <defs>
            <linearGradient id="strokeGradient" x1="100%" y1="0%" x2="0%" y2="0%">
              <stop offset="0%" stopColor="#FFFFFF" stopOpacity={1} />
              <stop offset="40.32%" stopColor="#FFFFFF" stopOpacity={0.4} />
            </linearGradient>
          </defs>
          <XAxis dataKey="day" axisLine={false} tickLine={false} interval={0} tick={{ fill: '#FFFFFF', opacity: 0.6 }} dy={0} />
          <YAxis domain={[0, 120]} hide={true} />
          <Tooltip contentStyle={{ display: 'none' }} labelStyle={{ display: 'none' }} labelFormatter={('')} formatter={(value) => `${value} min`} itemStyle={{ color: '#000000', fontWeight: 'bold' }} />
          <Line dot={false} type="basis" dataKey="sessionLength" curve={curveCardinal} stroke="url(#strokeGradient)" strokeWidth={2} />
          <text width={20} height={60} x="50%" y="60" fontSize={16} textAnchor="middle" fill="#FFFFFF" opacity={0.6} fontWeight={'bold'}>Durée moyenne des sessions</text>
          <Area type="monotone" dataKey="amt" fill="#000" stroke="#000" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default AverageSession;
