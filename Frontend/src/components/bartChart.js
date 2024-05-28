import React from 'react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Rectangle } from 'recharts';
import './styles/BarChart.css'; 

const CustomBar = (props) => {
    const { x, y, fill, height } = props;
    return (
        <Rectangle
            x={x}
            y={y}
            width={12}
            height={height}
            fill={fill}
            radius={[10, 10, 0, 0]}
        />
    );
};

const CustomTooltip = ({ active, payload }) => {
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

const Activity = ({ activityData }) => {
    if (!activityData || !activityData.length) {
        return <div>Loading...</div>;
    }

    const minWeight = Math.min(...activityData.map(entry => entry.kilogram));
    const maxWeight = Math.max(...activityData.map(entry => entry.kilogram));
    const weightDomain = [minWeight - 1, maxWeight + 0];

    return (
        <div className="activity-container">
            <div className="activity-header">
                <h3>Activité quotidienne</h3>
            </div>
            <div className="activity-chart">
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart background='#FBFBFB' data={activityData} barCategoryGap={50}>
                        <XAxis dataKey="day" tickLine={false} dy={10} dx={-15} tickFormatter={(value, index) => index + 1} />
                        <YAxis yAxisId="right" tickLine={false} orientation="right" domain={weightDomain} axisLine={false} />
                        <YAxis yAxisId="left" hide domain={[0, 550]} />
                        <Tooltip content={<CustomTooltip />} />
                        <Legend verticalAlign="top" align="right" iconType="circle" />
                        <CartesianGrid vertical={false} stroke="#ccc" strokeWidth={1} strokeDasharray="3 3" />
                        <Bar dataKey="kilogram" fill="#282D30" yAxisId="right" shape={<CustomBar />} name="Poids (kg)" />
                        <Bar dataKey="calories" fill="#E60000" yAxisId="left" shape={<CustomBar />} name="Calories brulées (kCal)" />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default Activity;
