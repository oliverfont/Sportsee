import React from 'react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Rectangle } from 'recharts';
import './styles/BarChart.css';

const CustomBar = (props) => {
    const { x, y, fill } = props;

    return (
        <Rectangle
            x={x}
            y={y}
            width={12}
            height={props.height}
            fill={fill}
            radius={[10, 10, 0, 0]} // Arrondir les coins supérieurs gauche et droit
        />
    );
};

const Activity = ({ data }) => {
    // Trouver le poids minimum et maximum dans les données
    const minWeight = Math.min(...data.map(entry => entry.kilogram));
    const maxWeight = Math.max(...data.map(entry => entry.kilogram));

    // Calculer le domaine pour l'axe Y des kilogrammes
    const weightDomain = [minWeight - 1, maxWeight + 0];

    return (
        <div className="activity-container">
            <div className="activity-header">
                <h3>Activité quotidienne</h3>
            </div>
            <div className="activity-chart">
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart background='#FBFBFB' data={data} justifyContent='center' barGap={-20}> {/* Ajustez la valeur de barGap selon vos besoins */}
                        <XAxis domain={[1, 7]} tickLine={false} dy={10} dx={-25} />
                        <YAxis yAxisId="right" tickLine={false} orientation="right" domain={weightDomain} axisLine={false} />
                        <YAxis yAxisId="left" hide domain={[0, 550]} />
                        <Tooltip verticalAlign="top" align="left" label="Titre" labelStyle={{ textAlign: 'left', fontSize: 16, fontWeight: 'bold' }} />
                        <Legend verticalAlign="top" align="right" />
                        <CartesianGrid vertical={false} stroke="#ccc" strokeWidth={1} strokeDasharray="3 3" />
                        <Bar dataKey="kilogram" fill="#282D30" yAxisId="right" shape={<CustomBar />} />
                        <Bar dataKey="calories" fill="#E60000" yAxisId="left" shape={<CustomBar />} />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default Activity;
