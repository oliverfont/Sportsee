import React from 'react';
import { curveCardinal } from 'd3-shape';
import { LineChart, Line, XAxis, Tooltip, YAxis } from 'recharts';

const AverageSession = ({ data }) => {
  // Créer un objet pour mapper les nombres de jours aux noms des jours
  const dayNames = {
    1: 'L',
    2: 'M',
    3: 'M',
    4: 'J',
    5: 'V',
    6: 'S',
    7: 'D'
  };

  // Transformer les données pour utiliser les noms des jours au lieu des nombres de jours
  const averageSessionData = data.map(session => ({
    day: dayNames[session.day], // Utiliser dayNames pour obtenir le nom du jour correspondant au nombre de jour
    sessionLength: session.sessionLength
  }));

  return (
    <div style={{ borderRadius: '5px', background: '#F00', width: '300px', height: '300px' }}>
      <LineChart width={300} height={300} data={averageSessionData}>
        <XAxis dataKey="day" axisLine={false} tickLine={false} interval={0} tick={{ fill: '#FFFFFF', opacity: 0.6 }} dy={0} />
        <YAxis domain={[0, 120]} hide="true" />
        <Tooltip labelStyle={{ display: 'none' }} labelFormatter={() => null} formatter={(value) => value} itemStyle={{ color: '#000000' }} 
/>
        <Line dot={false} type="basis" dataKey="sessionLength" stroke="#ffffff" curve={curveCardinal} />
<text x="130" y="60" width="80" textAnchor="middle" fill="#FFFFFF" opacity={0.6}>Durée moyenne des sessions</text>
     </LineChart>
    </div>
  );
};

export default AverageSession;
