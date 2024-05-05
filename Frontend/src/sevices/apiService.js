import axios from 'axios';

const baseURL = 'http://localhost:3000';

export const getUserMainData = async (userId) => {
    try {
        const response = await axios.get(`${baseURL}/user/${userId}`);
        return response.data;
    } catch (error) {
        console.error('Error:', error);
        throw new Error('Erreur lors de la récupération des données de l\'utilisateur');
    }
};

export const getUserActivity = async (userId) => {
    try {
        const response = await axios.get(`${baseURL}/user/${userId}/activity`);
        return response.data;
    } catch (error) {
        console.error('Error:', error);
        throw new Error('Erreur lors de la récupération des activités de l\'utilisateur');
    }
};

export const getUserAverageSessions = async (userId) => {
    try {
        const response = await axios.get(`${baseURL}/user/${userId}/average-sessions`);
        return response.data;
    } catch (error) {
        console.error('Error:', error);
        throw new Error('Erreur lors de la récupération des sessions moyennes de l\'utilisateur');
    }
};

export const getUserPerformance = async (userId) => {
    try {
        const response = await axios.get(`${baseURL}/user/${userId}/performance`);
        return response.data;
    } catch (error) {
        console.error('Error:', error);
        throw new Error('Erreur lors de la récupération des performances de l\'utilisateur');
    }
};
  