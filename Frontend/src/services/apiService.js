import axios from 'axios';
import { USER_MAIN_DATA, USER_ACTIVITY, USER_AVERAGE_SESSIONS, USER_PERFORMANCE } from '../mock/dataMock';

// Définition de l'URL de base pour les requêtes API
const baseURL = 'http://localhost:3000';

// Fonction générique pour effectuer les requêtes API
const fetchData = async (endpoint) => {
  try {
    const response = await axios.get(`${baseURL}/${endpoint}`);
    return response.data.data;
  } catch (error) {
    console.log(`Error fetching ${endpoint}:`, error);
    return null;
  }
};

// Fonction pour récupérer les données principales de l'utilisateur
export const getUserMainData = async (userId) => {
  const endpoint = `user/${userId}`;
  const data = await fetchData(endpoint);
  
  if (data) {
    return { data };
  } else {
    console.log('API is not functional. Using mock data instead.');
    const mockData = USER_MAIN_DATA.find(user => user.id === parseInt(userId));
    return { data: mockData };
  }
};

// Fonction pour récupérer les activités de l'utilisateur
export const getUserActivity = async (userId) => {
  const endpoint = `user/${userId}/activity`;
  const data = await fetchData(endpoint);

  if (data) {
    return { data };
  } else {
    console.log('API is not functional. Using mock data instead.');
    const mockData = USER_ACTIVITY.find(user => user.userId === parseInt(userId));
    return { data: mockData };
  }
};

// Fonction pour récupérer les sessions moyennes de l'utilisateur
export const getUserAverageSessions = async (userId) => {
  const endpoint = `user/${userId}/average-sessions`;
  const data = await fetchData(endpoint);

  if (data) {
    return { data };
  } else {
    console.log('API is not functional. Using mock data instead.');
    const mockData = USER_AVERAGE_SESSIONS.find(user => user.userId === parseInt(userId));
    return { data: mockData };
  }
};

// Fonction pour récupérer les performances de l'utilisateur
export const getUserPerformance = async (userId) => {
  const endpoint = `user/${userId}/performance`;
  const data = await fetchData(endpoint);

  if (data) {
    return { data };
  } else {
    console.log('API is not functional. Using mock data instead.');
    const mockData = USER_PERFORMANCE.find(user => user.userId === parseInt(userId));
    return { data: mockData };
  }
};
