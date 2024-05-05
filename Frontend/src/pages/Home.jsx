// Home.jsx

import React, { useState } from "react";
import { Link } from "react-router-dom";
import Asside from "../components/Asside";
import App from "../App";
import '../App.css';
import Nav from "../components/Nav";

const Home = () => {
    const [selectedUserId, setSelectedUserId] = useState(null); // Ajoutez une variable d'état pour le profil sélectionné

    const handleProfileSelect = (userId) => {
        setSelectedUserId(userId); // Mettre à jour le profil sélectionné
        // Enregistrer l'ID du profil sélectionné dans le stockage local
        localStorage.setItem('lastSelectedProfile', userId);
    };

    return (
        <div className='main'>
            <Nav selectedUserId={selectedUserId} /> {/* Passer l'ID sélectionné comme prop à Nav */}
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
                </div>
            </div>
        </div>
    );
};

export default Home;
