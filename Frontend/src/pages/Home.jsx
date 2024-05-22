import React, { useState } from "react";
import { Link } from "react-router-dom";
import Asside from "../components/Asside";
import '../App.css';
import Nav from "../components/Nav";

const Home = () => {
    const [selectedUserId, setSelectedUserId] = useState(null); 

    const handleProfileSelect = (userId) => {
        setSelectedUserId(userId);
        localStorage.setItem('lastSelectedProfile', userId);
    };

    return (
        <div className='main'>
            <Nav selectedUserId={selectedUserId} />
            <div className='flex'>
                <Asside />
                <div className='flex4'>
                    <h1 className="title">Choisissez votre profil :</h1>
                    <div>
                        <Link to={`/profile/12`} onClick={() => handleProfileSelect(12)}>Karl</Link>
                    </div>
                    <div>
                        <Link to={`/profile/18`} onClick={() => handleProfileSelect(18)}>Cecilia</Link>
                    </div>
                    <div>
                        <Link to={`/profile/1`} onClick={() => handleProfileSelect(18)}>John Doe</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
