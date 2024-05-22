PRÈREQUIS

Avant d'exécuter ce projet localement, assurez-vous d'avoir installé les éléments suivants sur votre machine:

- Node.js - Runtime JavaScript
- npm ou Yarn - Gestionnaire de paquets JavaScript


INSTALLATION && CONFIGURATION

1- Clonez ce dépôt sur votre machine locale en utilisant la commande suivante : git clone <URL_DU_REPO

2- Accédez au répertoire du projet : cd NOM_DU_REP

3- Installez les dépendances du projet en exécutant la commande suivante : 
    npm install 
ou 
    yarn install


EXÉCUTION - Démarrage du serveur Web

Dans ce projet, vous trouverez deux sous-dossiers:

- Front-End : Inclut des éléments visuels permettant à l'utilisateur d'interagir avec l'application.
- Back-End : Côté serveur - Micro API -

Accèdez au dossier Back-End :
    cd Backend

Choisissez et exécutez la ligne de commande : 
    yarn start
ou
    npm start

Cette commande démarre le serveur API sur le port 3000

Dans un nouveau terminal, accèdez au dossier Front-End :
    cd Frontend

Choisissez et exécutez la ligne de commande qui vous convient :
    npm start
ou
    yarn start

Cette commande démarre le serveur sur le port 3001. Vous pourrez accéder à l'application en ouvrant votre navigateur et en visitant l'URL suivante : http://localhost:3001

Actuellement seuls deux utilisateurs ont été simulés. Ils ont respectivement les identifiants 12 et 18.


OUTILS

Ce projet a été développé en utilisant les technologies suivantes :

- Vite - Un outil de build rapide pour les applications web modernes.
- React.js - Une bibliothèque JavaScript pour construire des interfaces utilisateur.
- JavaScript (ES6+) - La version moderne de JavaScript pour écrire du code côté client.
- HTML - Le langage de balisage standard pour la création de pages web et d'applications web interactives.
- CSS (Sass) - Un préprocesseur CSS pour faciliter l'écriture de feuilles de style.
- Recharts - Une bibliothèque utilisée pour créer des graphiques pour React JS.
