import React from 'react';
import calorieIcon from '../assets/calories-icon.svg';
import proteinIcon from '../assets/protein-icon.svg';
import carbohydrateIcon from '../assets/carbs-icon.svg';
import lipidIcon from '../assets/fat-icon.svg';
import './styles/nutri.css';

const Nutri = ({ data }) => {
  if (!data) return <div>Loading nutri...</div>;

  const dataWithIcons = [
    { label: 'Calories', value: data.keyData.calorieCount, icon: calorieIcon },
    { label: 'Protéines', value: data.keyData.proteinCount, icon: proteinIcon },
    { label: 'Glucides', value: data.keyData.carbohydrateCount, icon: carbohydrateIcon },
    { label: 'Lipides', value: data.keyData.lipidCount, icon: lipidIcon }
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
