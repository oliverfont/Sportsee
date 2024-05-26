import axios from 'axios';
import { USER_MAIN_DATA, USER_ACTIVITY, USER_AVERAGE_SESSIONS, USER_PERFORMANCE } from '../mock/dataMock';

// Définition de l'URL de base pour les requêtes API
const baseURL = 'http://localhost:3000';

// Fonction générique pour effectuer les requêtes API
const fetchData = async (endpoint) => {
    try {
        const response = await axios.get(`${baseURL}/${endpoint}`);
        return response.data;
    } catch (error) {
        console.log(`Error fetching ${endpoint}:`, error);
        return null;
    }
};

// Fonction pour vérifier si l'API est fonctionnelle
const isApiFunctional = async (userId) => {
    try {
        await fetchData(`user/${userId}`);
        return true;
    } catch (error) {
        return false;
    }
};

// Fonction pour récupérer les données principales de l'utilisateur
export const getUserMainData = async (userId) => {
    if (await isApiFunctional(userId)) {
        return fetchData(`user/${userId}`);
    } else {
        console.log('API is not functional. Using mock data instead.');
        return USER_MAIN_DATA;
    }
};

// Fonction pour récupérer les activités de l'utilisateur
export const getUserActivity = async (userId) => {
    const data = await fetchData(`user/${userId}/activity`);
    return data ? data : USER_ACTIVITY;
};

// Fonction pour récupérer les sessions moyennes de l'utilisateur
export const getUserAverageSessions = async (userId) => {
    const data = await fetchData(`user/${userId}/average-sessions`);
    return data ? data : USER_AVERAGE_SESSIONS;
};

// Fonction pour récupérer les performances de l'utilisateur
export const getUserPerformance = async (userId) => {
    if (await isApiFunctional(userId)) {
        return fetchData(`user/${userId}/performance`);
    } else {
        console.log('API is not functional. Using mock data instead.');
        return USER_PERFORMANCE;
    }
};
