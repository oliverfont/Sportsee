import axios from 'axios';

// Définition de l'URL de base pour les requêtes API
const baseURL = 'http://localhost:3000';

// Fonction pour récupérer les données principales de l'utilisateur
export const getUserMainData = async (userId) => {
    try {
        // Requête GET pour obtenir les données principales de l'utilisateur
        const response = await axios.get(`${baseURL}/user/${userId}`);
        // Retourne les données de la réponse
        return response.data;
    } catch (error) {
        // Affichage de l'erreur dans la console
        console.log('Error:', error);
        // Lance une nouvelle erreur avec un message plus clair
        throw new Error('Erreur lors de la récupération des données de l\'utilisateur');
    }
};

// Fonction pour récupérer les activités de l'utilisateur
export const getUserActivity = async (userId) => {
    try {
        const response = await axios.get(`${baseURL}/user/${userId}/activity`);
        return response.data;
    } catch (error) {
        console.log('Error:', error);
        throw new Error('Erreur lors de la récupération des activités de l\'utilisateur');
    }
};

// Fonction pour récupérer les sessions moyennes de l'utilisateur
export const getUserAverageSessions = async (userId) => {
    try {
        const response = await axios.get(`${baseURL}/user/${userId}/average-sessions`);
        return response.data;
    } catch (error) {
        console.log('Error:', error);
        throw new Error('Erreur lors de la récupération des sessions moyennes de l\'utilisateur');
    }
};

// Fonction pour récupérer les performances de l'utilisateur
export const getUserPerformance = async (userId) => {
    try {
        const response = await axios.get(`${baseURL}/user/${userId}/performance`);
        return response.data;
    } catch (error) {
        console.log('Error:', error);
        throw new Error('Erreur lors de la récupération des performances de l\'utilisateur');
    }
};
