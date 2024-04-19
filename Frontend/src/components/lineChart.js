import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

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
    <LineChart width={600} height={300} data={averageSessionData}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="day" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Line type="monotone" dataKey="sessionLength" stroke="#8884d8" />
    </LineChart>
  );
};

export default AverageSession;
