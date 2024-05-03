import React, { useEffect, useState } from 'react';
import axios from 'axios';
import calorieIcon from '../assets/calories-icon.svg';
import proteinIcon from '../assets/protein-icon.svg';
import carbohydrateIcon from '../assets/carbs-icon.svg';
import lipidIcon from '../assets/fat-icon.svg';
import './styles/nutri.css';

const baseURL = 'http://localhost:3000';

const Nutri = ({ userId }) => {
  const [nutriData, setNutriData] = useState(null);

  useEffect(() => {
    const fetchNutriData = async () => {
      try {
        const response = await axios.get(`${baseURL}/user/${userId}`);
        setNutriData(response.data.data.keyData); // Accéder à la propriété keyData des données de réponse
      } catch (error) {
        console.error('Error fetching nutri data:', error);
      }
    };

    fetchNutriData();
  }, [userId]);

  if (!nutriData) return <div>Loading nutri...</div>;

  const dataWithIcons = [
    { label: 'Calories', value: nutriData.calorieCount, icon: calorieIcon },
    { label: 'Protéines', value: nutriData.proteinCount, icon: proteinIcon },
    { label: 'Glucides', value: nutriData.carbohydrateCount, icon: carbohydrateIcon },
    { label: 'Lipides', value: nutriData.lipidCount, icon: lipidIcon }
  ];

  return (
    <div className='nutri'>
      {dataWithIcons.map((item, index) => (
        <div className='nutri-item' key={index}>
          <img src={item.icon} alt={item.label} style={{ width: '60px', height: '60px' }} />
          <div>
            <p>{item.value}</p>
            <p>{item.label}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Nutri;
