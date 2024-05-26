import React, { useState, useEffect } from 'react';
import { getUserActivity } from '../services/apiService.js'; // Import du service pour récupérer les données utilisateur
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Rectangle } from 'recharts';
import './styles/BarChart.css'; 

// Composant personnalisé pour le rendu des barres
const CustomBar = (props) => {
    const { x, y, fill } = props;

    return (
        <Rectangle
            x={x}
            y={y}
            width={12}
            height={props.height}
            fill={fill}
            radius={[10, 10, 0, 0]}
        />
    );
};

// Composant personnalisé pour l'affichage des tooltips
const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
        return (
            <div className="custom-tooltip" style={{ backgroundColor: '#E60000', color: '#FFFFFF', marginTop: '-100px' }}>
                {payload.map((entry, index) => (
                    <p key={`data-${index}`} style={{ fontWeight: 'bold', margin: '30px 0' }}>{`${entry.value} ${entry.dataKey === 'kilogram' ? 'kg' : 'kCal'}`}</p>
                ))}
            </div>
        );
    }

    return null;
};

const Activity = ({ userId }) => {
    // State pour stocker les données de l'utilisateur
    const [activityData, setActivityData] = useState(null);

    // Effet pour récupérer les données de l'utilisateur
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getUserActivity(userId); // Récupération des données via le service API
                setActivityData(response.data.sessions); // Mise à jour des données
            } catch (error) {
                console.log('Error fetching activity data:', error);
            }
        };

        fetchData(); // Appel de la fonction de récupération des données
    }, [userId]); // Déclenchement de l'effet lorsque l'ID utilisateur change

    // Affichage d'un message de chargement si les données ne sont pas disponibles
    if (!activityData || !activityData.length) {
        return <div>Loading...</div>;
    }

    // Calcul du domaine de l'axe Y pour le poids
    const minWeight = Math.min(...activityData.map(entry => entry.kilogram));
    const maxWeight = Math.max(...activityData.map(entry => entry.kilogram));
    const weightDomain = [minWeight - 1, maxWeight + 0];

    // Rendu du composant Activity
    return (
        <div className="activity-container">
            <div className="activity-header">
                <h3>Activité quotidienne</h3>
            </div>
            <div className="activity-chart">
                {/* Utilisation de ResponsiveContainer pour le rendu du graphique */}
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart background='#FBFBFB' data={activityData} barCategoryGap={50}>
                        <XAxis dataKey="day" tickLine={false} dy={10} dx={-15} tickFormatter={(value, index) => index + 1} />
                        <YAxis yAxisId="right" tickLine={false} orientation="right" domain={weightDomain} axisLine={false} />
                        <YAxis yAxisId="left" hide domain={[0, 550]} />
                        <Tooltip content={<CustomTooltip />} />
                        <Legend verticalAlign="top" align="right" iconType="circle" />
                        <CartesianGrid vertical={false} stroke="#ccc" strokeWidth={1} strokeDasharray="3 3" />
                        {/* Barres pour le poids */}
                        <Bar dataKey="kilogram" fill="#282D30" yAxisId="right" shape={<CustomBar />} name="Poids (kg)" />
                        {/* Barres pour les calories */}
                        <Bar dataKey="calories" fill="#E60000" yAxisId="left" shape={<CustomBar />} name="Calories brulées (kCal)" />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default Activity;
