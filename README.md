# Série au hasard 2.1

PWA française pour choisir un film ou un épisode au hasard, avec métadonnées TMDB, suivi automatique ou manuel et import Serializd.

## Déploiement
GitHub Pages : Settings → Pages → Deploy from a branch → main → /(root).
Adresse : https://ikrameelf.github.io/Sah-iph-/

## Configuration TMDB
1. Crée un compte sur https://www.themoviedb.org/
2. Dans les paramètres développeur/API, récupère ton jeton d'accès API v4 (Bearer).
3. Dans l'application, ouvre ⚙ Paramètres et colle le jeton. Il reste dans le stockage local du navigateur et n'est jamais ajouté à GitHub.
4. Langue par défaut : français.

## Import Serializd
L'application accepte l'export JSON de l'outil communautaire https://github.com/belepod/serializd-export.
Sur ton ordinateur, lance cet outil localement (Node.js 18+ ou Docker) avec tes identifiants dans un fichier .env local, jamais partagé ni publié. Pour inclure le suivi des épisodes, exporte tous les champs et les deux sections :
`serializd-export --all --format json`
Puis transfère le fichier `serializd-export.json` sur ton iPhone et utilise « Importer mon export Serializd (JSON) » dans l'application. Le fichier est traité localement. L'import recherche les séries dans TMDB par nom et tente de retrouver le dernier épisode journalisé dans le diary. Vérifie les correspondances et les progressions après import : les noms homonymes et les journaux incomplets peuvent demander une correction manuelle. Ne communique jamais ton mot de passe Serializd à l'application ou à ChatGPT.

## Progression manuelle
Dans Ma bibliothèque, bouton MODIFIER sur une série : saisis la saison et le prochain épisode à regarder. Pour un film, VU / À VOIR permet de marquer s'il est déjà vu. Le bouton « J'ai vu cet épisode » fait avancer automatiquement la progression des séries. Les séries terminées sont retirées des tirages actifs ; tu peux les réactiver depuis la bibliothèque.

## Fonctionnalités
- Recherche de séries et films via TMDB.
- Fiche de série, affiche, résumé et visuel du prochain épisode.
- Films : affiche, année, synopsis et durée.
- Progression épisode par épisode, automatique ou manuelle.
- Import de bibliothèque Serializd depuis un fichier JSON.
- Exclusion/réintégration, suppression et historique.
- PWA hors connexion : l'interface et les données déjà chargées restent accessibles. Les nouvelles recherches TMDB nécessitent Internet.

## Données et attribution
Bibliothèque, progression, réglages et cache de métadonnées stockés sur cet appareil. Aucun compte applicatif ni serveur de synchronisation.
This product uses the TMDB API but is not endorsed or certified by TMDB.