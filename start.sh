#!/bin/bash

# Fonction pour vérifier si le code est à jour
check_code_update() {
    git remote update
    if git status -uno | grep -q 'Your branch is behind'; then
        git pull
        npm install
        echo "Code mis à jour avec succès."
    else
        echo "Le code est à jour."
    fi
}

# Appel de la fonction pour vérifier la mise à jour du code
check_code_update

# Lancement du bot Discord
npm start
