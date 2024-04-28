// Importer Axios
const axios = require('axios');

// URL de votre backend sur localhost:3000
const baseURL = 'http://localhost:3000';

// Fonction pour récupérer les données de l'utilisateur par ID
const getUserDataById = async (userId) => {
    try {
        // Effectuer une requête GET à l'URL appropriée pour récupérer les données de l'utilisateur
        const response = await axios.get(`${baseURL}/user/${userId}`);
        // Retourner les données de l'utilisateur
        return response.data;
    } catch (error) {
        // Gérer les erreurs en cas de problème avec la requête
        console.error('Error:', error);
        throw new Error('Erreur lors de la récupération des données de l\'utilisateur');
    }
};

// Fonction pour récupérer les activités quotidiennes de l'utilisateur par ID
const getUserActivityById = async (userId) => {
    try {
        // Effectuer une requête GET à l'URL appropriée pour récupérer les activités quotidiennes de l'utilisateur
        const response = await axios.get(`${baseURL}/user/${userId}/activity`);
        // Retourner les activités quotidiennes de l'utilisateur
        return response.data;
    } catch (error) {
        // Gérer les erreurs en cas de problème avec la requête
        console.error('Error:', error);
        throw new Error('Erreur lors de la récupération des activités de l\'utilisateur');
    }
};

// Fonction pour récupérer les chiffres clés de l'utilisateur par ID
const getUserKeyDataById = async (userId) => {
    try {
        // Effectuer une requête GET à l'URL appropriée pour récupérer les chiffres clés de l'utilisateur
        const response = await axios.get(`${baseURL}/user/${userId}/key-data`);
        // Retourner les chiffres clés de l'utilisateur
        return response.data;
    } catch (error) {
        // Gérer les erreurs en cas de problème avec la requête
        console.error('Error:', error);
        throw new Error('Erreur lors de la récupération des chiffres clés de l\'utilisateur');
    }
};

// Utilisation des fonctions pour récupérer les données de l'utilisateur
const userId = 18; // Remplacez 123 par l'ID de l'utilisateur que vous souhaitez récupérer

getUserDataById(userId)
    .then(userData => {
        console.log('Données de l\'utilisateur:', userData);
        // Utilisez les données de l'utilisateur récupérées
    })
    .catch(error => console.error('Error:', error));

getUserActivityById(userId)
    .then(activityData => {
        console.log('Activités de l\'utilisateur:', activityData);
        // Utilisez les activités de l'utilisateur récupérées
    })
    .catch(error => console.error('Error:', error));

getUserKeyDataById(userId)
    .then(keyData => {
        console.log('Chiffres clés de l\'utilisateur:', keyData);
        // Utilisez les chiffres clés de l'utilisateur récupérés
    })
    .catch(error => console.error('Error:', error));
