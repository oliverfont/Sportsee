import React, { useState, useEffect } from 'react';
import { getUserMainData } from '../sevices/apiService.js';
import { USER_MAIN_DATA } from '../mock/dataMock.js';
import { ResponsiveContainer, RadialBarChart, RadialBar } from 'recharts';
import './styles/kpiScore.css';
const KpiScore = ({ userId }) => {
  // State pour stocker le score de l'utilisateur
  const [score, setScore] = useState(null);

  // Effet pour récupérer le score de l'utilisateur
  useEffect(() => {
    const fetchScore = async () => {
      try {
        const userData = await getUserMainData(userId); // Récupération des données via le service API
        const userScore = userData && userData.data && userData.data.score;
        setScore(userScore); // Mise à jour du score
      } catch (error) {
        console.log('Error fetching user score:', error);
        const userMainDataFromMock = USER_MAIN_DATA.find(user => user.id === parseInt(userId));
        if (userMainDataFromMock) {
          setScore(userMainDataFromMock.score); // Utilisation des données de mock en cas d'erreur
        } else {
          setScore(null);
        }
      }
    };

    fetchScore(); // Appel de la fonction de récupération du score
  }, [userId]); // Déclenchement de l'effet lorsque l'ID utilisateur change

  // Affichage d'un message de chargement si le score n'est pas encore disponible
  if (score === null) return <div>Loading score...</div>;

  // Calcul du pourcentage du score
  const percentage = score * 100;
  // Calcul de l'angle de fin en fonction du pourcentage
  const endAngle = (percentage * 3.6) - 180;
  // Création des données pour le graphique radial
  const data = [{ name: 'Score', value: percentage }];

  // Rendu du composant KpiScore
  return (
    <div style={{ padding: '0 10px', borderRadius: '5px', background: '#FBFBFB', width: '100%', height: '300px' }}>
      <ResponsiveContainer width="100%" height="100%">
        <RadialBarChart innerRadius="50%" outerRadius="60%" data={data} startAngle={222} endAngle={-endAngle + 44}>
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
