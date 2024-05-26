import React, { useEffect, useState } from 'react';
import { getUserMainData } from '../services/apiService';
import { NutriFormatter } from '../mock/dataFormat';
import './styles/nutri.css';

const Nutri = ({ userId }) => {
  const [nutriData, setNutriData] = useState(null);

  useEffect(() => {
    const fetchNutriData = async () => {
      try {
        const response = await getUserMainData(userId); // Récupération des données via le service API
        setNutriData(response.data.keyData); // Mise à jour des données
      } catch (error) {
        console.log('Error fetching nutri data:', error);
        setNutriData(null); // Gérer l'erreur de manière appropriée
      }
    };

    fetchNutriData(); // Appel de la fonction de récupération des données
  }, [userId]);

  if (!nutriData) return <div>Loading nutri...</div>;

  const dataWithIcons = NutriFormatter.formatNutriData(nutriData);

  return (
    <div className='nutri'>
      {dataWithIcons.map((item, index) => (
        <div className='nutri-item' key={index}>
          <img src={item.icon} alt={item.label} style={{ width: '60px', height: '60px' }} />
          <div>
            <p style={{ fontSize: '20px', fontWeight: 'bold', margin: '3px 0' }}>{item.value}</p>
            <p style={{ fontSize: '14px', fontWeight: 'bold', color: '#74798C', margin: '3px 0' }}>{item.label}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Nutri;
