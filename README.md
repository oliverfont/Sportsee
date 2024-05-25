# PRÈREQUIS

Avant d'exécuter ce projet localement, assurez-vous d'avoir installé les éléments suivants sur votre machine:

- Node.js - Runtime JavaScript
- npm ou Yarn - Gestionnaire de paquets JavaScript


# INSTALLATION

1- Clonez ce dépôt sur votre machine locale en utilisant la commande suivante : git clone <URL_DU_REPO

2- Accédez au répertoire du projet : cd NOM_DU_REP

3- Installez les dépendances du projet en exécutant la commande suivante : 
    `npm install` 
ou 
    `yarn install`


# EXÉCUTION

Dans ce projet, vous trouverez deux sous-dossiers:

- Frontend : Inclut des éléments visuels permettant à l'utilisateur d'interagir avec l'application.
- Backend : Côté serveur - Micro API -

## Backend

Accèdez au dossier Back-End :
    `cd Backend`

Choisissez et exécutez la ligne de commande : 
    `yarn start`
ou
    `npm start`

Cette commande démarre le serveur API sur le port 3000

Actuellement seuls deux utilisateurs ont été simulés. Ils ont respectivement les identifiants 12 et 18.

Vous pouvez vérifier l'état du serveur en ouvrant votre navigateur et en visitant les end-point de l'API qui permettent d'accéder aux différentes données utilisateur de l'application :

- http://localhost:3000/user/${userId} - pour les informations générales d'un utilisateur. Ce premier endpoint inclut l'identifiant de l'utilisateur, les informations de l'utilisateur (prénom, nom et âge), le score du jour actuel (todayScore) et les données clés (calories, macronutriments, etc.).
- http://localhost:3000/user/${userId}/activity - pour l'activité quotidienne d'un utilisateur avec les kilogrammes et les calories.
- http://localhost:3000/user/${userId}/average-sessions - pour les sessions moyennes d'un utilisateur par jour. La semaine commence le lundi.
- http://localhost:3000/user/${userId}/performance - pour la performance d'un utilisateur (énergie, endurance, etc.).

## Frontend

Dans un nouveau terminal, accèdez au dossier Front-End :
    `cd Frontend`

Choisissez et exécutez la ligne de commande qui vous convient :
    `npm start`
ou
    `yarn start`

Cliquez sur la touche `y` (yes) lorsqu'il vous sera demandé :
     
    'Would you like to run the app on another port instead?'

Cette commande démarre le serveur sur le port 3001. Vous pourrez accéder à l'application en ouvrant votre navigateur et en visitant l'URL suivante : http://localhost:3001


# OUTILS

Ce projet a été développé en utilisant les technologies suivantes :

- React.js - Une bibliothèque JavaScript pour construire des interfaces utilisateur.
- JavaScript (ES6+) - La version moderne de JavaScript pour écrire du code côté client.
- HTML - Le langage de balisage standard pour la création de pages web et d'applications web interactives.
- CSS (Sass) - Un préprocesseur CSS pour faciliter l'écriture de feuilles de style.
- Recharts - Une bibliothèque utilisée pour créer des graphiques pour React JS.
