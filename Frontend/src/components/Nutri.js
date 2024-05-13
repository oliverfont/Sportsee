import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { NutriFormatter } from '../mock/dataFormat';
import './styles/nutri.css';
import { USER_MAIN_DATA } from '../mock/dataMock';

const baseURL = 'http://localhost:3000';

const Nutri = ({ userId }) => {
  const [nutriData, setNutriData] = useState(null);

  useEffect(() => {
    const fetchNutriData = async () => {
      try {
        const response = await axios.get(`${baseURL}/user/${userId}`);
        setNutriData(response.data.data.keyData);
      } catch (error) {
        console.error('Error fetching nutri data:', error);
        const userMainDataFromMock = USER_MAIN_DATA.find(user => user.id === parseInt(userId));
        if (userMainDataFromMock) {
          setNutriData(userMainDataFromMock.keyData);
        } else {
          setNutriData(null);
        }
      }
    };

    fetchNutriData();
  }, [userId]);

  if (!nutriData) return <div>Loading nutri...</div>;

  // Utilisation de la méthode de formatage de la classe utilitaire
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
