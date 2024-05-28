import React from 'react';
import './styles/nutri.css';

const Nutri = ({ nutriData }) => {
  return (
    <div className='nutri'>
      {nutriData.map((item, index) => (
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
