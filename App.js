const fs = require('fs').promises; // Module pour la gestion des fichiers avec promesses
const axios = require('axios');   // Module pour les requêtes HTTP

// Fonction pour lire un fichier
function readFile(filePath) {
    return fs.readFile(filePath, 'utf8')
        .then(data => {
            console.log("Contenu du fichier :", data);
            return data;
        })
        .catch(err => {
            console.error("Erreur lors de la lecture du fichier :", err);
            throw err;
        });
}

// Fonction pour effectuer un appel API
function fetchAPIData(apiUrl) {
    return axios.get(apiUrl)
        .then(response => {
            console.log("Données API reçues :", response.data);
            return response.data;
        })
        .catch(err => {
            console.error("Erreur lors de l'appel API :", err);
            throw err;
        });
}

// Fonction pour écrire dans un fichier
function writeFile(filePath, data) {
    return fs.writeFile(filePath, data, 'utf8')
        .then(() => {
            console.log("Les données ont été écrites dans le fichier :", filePath);
        })
        .catch(err => {
            console.error("Erreur lors de l'écriture du fichier :", err);
            throw err;
        });
}

// Utilisation des fonctions avec des promesses
const inputFilePath = 'input.txt';
const outputFilePath = 'output.txt';
const apiURL = 'https://jsonplaceholder.typicode.com/posts/1'; // API fictive

readFile(inputFilePath)
    .then(fileData => {
        console.log("Données du fichier lues avec succès.");
        return fetchAPIData(apiURL); // Appel API
    })
    .then(apiData => {
        console.log("Données API obtenues avec succès.");
        const combinedData = JSON.stringify(apiData, null, 2); // Mise en forme des données
        return writeFile(outputFilePath, combinedData); // Écriture dans un fichier
    })
    .then(() => {
        console.log("Toutes les opérations ont été effectuées avec succès !");
    })
    .catch(err => {
        console.error("Une erreur est survenue :", err);
    });