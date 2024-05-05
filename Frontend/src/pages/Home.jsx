// Home.jsx

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Nav from "../components/Nav";
import Asside from "../components/Asside";
import { getUserMainData } from "../sevices/apiService";
import '../App.css';

const Home = () => {
    const [userIds, setUserIds] = useState([]);

    useEffect(() => {
        const fetchUserIds = async () => {
            try {
                const userIdsFromAPI = await getUserMainData();
                setUserIds(userIdsFromAPI);
            } catch (error) {
                console.error('Error fetching user IDs:', error);
            }
        };

        fetchUserIds();
    }, []);

    return (
        <div className='main'>
            <Nav />
            <div className='flex'>
                <Asside />
                <h1 className="title">Choisissez votre profil :</h1>
                {userIds.map(userId => (
                    <div key={userId}>
                        <Link to={`/${userId}`}>Profil {userId}</Link>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Home;
