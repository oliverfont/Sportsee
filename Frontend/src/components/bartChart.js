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

const Activity = ({ userId }) => {
    const [activityData, setActivityData] = useState(null);

    useEffect(() => {
        const fetchActivityData = async () => {
            try {
                const response = await getUserActivity(userId);
                const sessions = response.data.sessions;
                setActivityData(sessions);
            } catch (error) {
                console.error('Error fetching activity data:', error);
                const userActivityFromMock = USER_ACTIVITY.find(user => user.userId === parseInt(userId));
                if (userActivityFromMock) {
                    setActivityData(userActivityFromMock.sessions);
                } else {
                    setActivityData(null);
                }
            }
        };

        fetchActivityData();
    }, [userId]);

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
                    <BarChart background='#FBFBFB' data={activityData}>
                        <XAxis dataKey="day" tickLine={false} dy={10} dx={-25} />
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
