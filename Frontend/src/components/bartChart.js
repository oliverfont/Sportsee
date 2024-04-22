import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const Activity = ({ data }) => {
    return (
        <BarChart width={600} height={300} data={data}>
            <XAxis domain={[1, 10]} />
            <Tooltip />
            <Legend />
            <Bar dataKey="kilogram" fill="#282D30" />
            <Bar dataKey="calories" fill="#E60000" />
        </BarChart>
    );
};

export default Activity;
