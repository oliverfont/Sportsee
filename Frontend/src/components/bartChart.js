import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Rectangle } from 'recharts';
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
        <div style={{ marginTop: '60px', background: '#FBFBFB', borderRadius: '5px', width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            {/* Ajustez la marge supérieure ici pour déplacer la légende plus haut */}
            <style>
                {`
                    div.recharts-legend-wrapper {
                        top: -40px !important;
                    }

                    recharts-default-legend {
                        display: none;
                    }

                    .recharts-surface {
                        border-radius: 33px;
                        width: 10px;
                        height: 10px;
                      }

                    .recharts-legend-item rect {
                        display: none; /* Masquer les carrés de légende */
                    }

                    .recharts-legend-item-text {
                        font-size: 12px; /* Ajuster la taille du texte de légende */
                    }

                    .recharts-legend-item-text::before {
                        content: '';
                        display: inline-block;
                        width: 10px; /* Définir la taille des cercles */
                        height: 10px; /* Définir la taille des cercles */
                        border-radius: 50%; /* Rendre les cercles ronds */
                        margin-right: 5px; /* Ajouter un espacement entre le cercle et le texte */
                    }

                    .recharts-legend-item-text.kilogram::before {
                        background-color: #282D30; /* Couleur du cercle pour les kilogrammes */
                    }

                    .recharts-legend-item-text.calories::before {
                        background-color: #E60000; /* Couleur du cercle pour les calories */
                    }
                `}
            </style>
            <div>
                <h3>Activité quotidienne</h3>
            </div>
            <BarChart background='#FBFBFB' width={966} height={300} data={data}>
                <XAxis domain={[1, 7]} tickLine={false} dy={10} dx={-10} />
                <YAxis yAxisId="right" tickLine={false} orientation="right" domain={weightDomain} axisLine={false} />
                <YAxis yAxisId="left" hide domain={[0, 550]} />
                <Tooltip verticalAlign="top" align="left" label="Titre" labelStyle={{ textAlign: 'left', fontSize: 16, fontWeight: 'bold' }} />
                <Legend verticalAlign="top" align="right" />
                <CartesianGrid vertical={false} stroke="#ccc" strokeWidth={1} strokeDasharray="3 3" />
                <Bar dataKey="kilogram" fill="#282D30" yAxisId="right" shape={<CustomBar />} />
                <Bar dataKey="calories" fill="#E60000" yAxisId="left" shape={<CustomBar />} />
            </BarChart>
        </div>
    );
};

export default Activity;
