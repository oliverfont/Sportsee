import React, { useState, useEffect } from 'react';
import { getUserActivity } from '../sevices/apiService.js';
import { USER_ACTIVITY } from '../mock/dataMock.js';
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
            radius={[10, 10, 0, 0]}
        />
    );
};

const renderLegendIcon = (props) => {
    const { payload } = props;

    return (
        <ul className="custom-legend">
            {payload.map((entry, index) => (
                <li key={`item-${index}`} style={{ listStyle: 'none', display: 'inline-block', marginRight: 20 }}>
                    <svg width={10} height={10}>
                        <circle cx={5} cy={5} r={5} fill={entry.color} />
                    </svg>
                    <span style={{ marginLeft: 5 }}>{entry.value}</span>
                </li>
            ))}
        </ul>
    );
};

const Activity = ({ userId }) => {
    const [activityData, setActivityData] = useState(null);
    const [useMockData, setUseMockData] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (!useMockData) {
                    const response = await getUserActivity(userId);
                    setActivityData(response.data.sessions);
                } else {
                    const userActivityFromMock = USER_ACTIVITY.find(user => user.userId === parseInt(userId));
                    if (userActivityFromMock) {
                        setActivityData(userActivityFromMock.sessions);
                    } else {
                        setActivityData(null);
                    }
                }
            } catch (error) {
                console.error('Error fetching activity data:', error);
                setUseMockData(true);
            }
        };

        fetchData();
    }, [userId, useMockData]);

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
                        <XAxis dataKey="day" tickLine={false} dy={10} dx={-5} tickFormatter={(value, index) => index + 1} />
                        <YAxis yAxisId="right" tickLine={false} orientation="right" domain={weightDomain} axisLine={false} />
                        <YAxis yAxisId="left" hide domain={[0, 550]} />
                        <Tooltip verticalAlign="top" align="left" label="Titre" labelStyle={{ textAlign: 'left', fontSize: 16, fontWeight: 'bold' }} />
                        <Legend verticalAlign="top" align="right" iconType="circle" content={renderLegendIcon} />
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
