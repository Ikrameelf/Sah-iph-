# Série au hasard 2.0

PWA française de sélection aléatoire de films et séries, avec métadonnées TMDB et suivi du prochain épisode.

## Déploiement
Dépôt GitHub Pages : Settings → Pages → Deploy from a branch → main → /(root).
Adresse attendue : https://ikrameelf.github.io/Sah-iph-/

## Configuration TMDB
1. Crée un compte sur https://www.themoviedb.org/
2. Dans les paramètres développeur/API, crée une application et récupère le **jeton d'accès API v4 (Bearer)**.
3. Ouvre l'application puis ⚙ Paramètres et colle le jeton. Il est conservé dans localStorage sur cet appareil, jamais dans le dépôt Git.
4. La recherche utilise les métadonnées en français par défaut.

## Fonctionnalités
- Recherche multi de films et séries via TMDB.
- Ajout des résultats à la bibliothèque locale.
- Tirage aléatoire en évitant deux fois le même titre consécutivement.
- Pour une série, récupération du prochain épisode non vu (saison/épisode, titre, résumé, image).
- Bouton « J'ai vu cet épisode » pour avancer la progression.
- Films : affiche, année, synopsis et durée.
- Exclusion/réintégration, suppression et historique.
- Service worker pour l'interface hors ligne.

## Données et limites
La bibliothèque, les réglages et les métadonnées déjà consultées sont stockés localement dans le navigateur. Les appels TMDB nécessitent Internet ; hors ligne, l'interface et les données enregistrées restent accessibles, mais les nouveaux résultats et épisodes non mis en cache ne peuvent pas être récupérés. Le jeton TMDB est stocké localement dans le navigateur : ne le partage pas et ne le colle jamais dans les fichiers publics du dépôt.

Les images d'épisodes ne sont pas toujours fournies par TMDB ; l'application utilise alors l'image de fond ou l'affiche de la série. La progression est personnelle à cet appareil et n'est pas synchronisée.

## Attribution
This product uses the TMDB API but is not endorsed or certified by TMDB.