// Fonction pour formater les données de l'utilisateur principal
const formatUserData = (userData) => {
    return {
        id: userData.id,
        firstName: userData.userInfos.firstName,
        lastName: userData.userInfos.lastName,
        age: userData.userInfos.age,
        todayScore: userData.todayScore,
        keyData: {
            calorieCount: userData.keyData.calorieCount,
            proteinCount: userData.keyData.proteinCount,
            carbohydrateCount: userData.keyData.carbohydrateCount,
            lipidCount: userData.keyData.lipidCount
        }
    };
};

// Fonction pour formater les données d'activité de l'utilisateur
const formatUserActivity = (activityData) => {
    return activityData.sessions.map(session => ({
        day: new Date(session.day), // Convertir la chaîne de date en objet Date
        Kg: session.kilogram,
        KCal: session.calories
    }));
};

// Fonction pour formater les données de sessions moyennes de l'utilisateur
const formatUserAverageSessions = (averageSessionsData) => {
    return averageSessionsData.sessions.map(session => ({
        day: session.day,
        '' : session.sessionLength
    }));
};

// Fonction pour formater les données de performance de l'utilisateur
const formatUserPerformance = (performanceData) => {
    return performanceData.data.map(performance => ({
        value: performance.value,
        kind: performance.kind
    }));
};

// Fonction pour formater toutes les données de l'utilisateur
const formatUserDataFromAPI = (userDataFromAPI) => {
    return {
        userData: formatUserData(userDataFromAPI.USER_MAIN_DATA[0]),
        userActivity: formatUserActivity(userDataFromAPI.USER_ACTIVITY[0]),
        userAverageSessions: formatUserAverageSessions(userDataFromAPI.USER_AVERAGE_SESSIONS[0]),
        userPerformance: formatUserPerformance(userDataFromAPI.USER_PERFORMANCE[0])
    };
};

// Exemple d'utilisation
const formattedData = formatUserDataFromAPI(dataFromAPI);
console.log(formattedData);
