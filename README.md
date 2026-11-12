# Série au hasard — application web mobile (PWA)

Application gratuite, sans compte, sans serveur applicatif et sans dépendance externe. Les séries et l'historique sont enregistrés dans `localStorage` sur l'appareil.

## Fichiers
- `index.html` : structure de l'application
- `styles.css` : interface responsive sombre
- `app.js` : ajout, édition, suppression, exclusion/réintégration, tirage et historique
- `manifest.webmanifest` : paramètres d'installation PWA
- `sw.js` : cache hors connexion
- `icons/` : icônes de l'application

## Installation gratuite sur iPhone

Pour qu'une PWA soit installable et que le mode hors connexion fonctionne, elle doit être servie depuis une adresse **HTTPS**. Ouvrir simplement `index.html` depuis l'app Fichiers ne suffit pas.

### Méthode simple : GitHub Pages (gratuit)
1. Sur un ordinateur, crée un compte GitHub gratuit si tu n'en as pas.
2. Crée un nouveau dépôt public, par exemple `serie-au-hasard`.
3. Envoie tous les fichiers et le dossier `icons` de cette archive à la racine du dépôt.
4. Dans le dépôt, ouvre **Settings → Pages**.
5. Dans **Build and deployment**, choisis **Deploy from a branch**, puis `main` et `/ (root)`, et enregistre.
6. Attends quelques instants. GitHub affichera l'adresse HTTPS de ton site (du type `https://TON-PSEUDO.github.io/serie-au-hasard/`).
7. Sur l'iPhone, ouvre cette adresse dans **Safari** (pas dans un navigateur intégré à une autre application).
8. Appuie sur **Partager** → **Sur l'écran d'accueil** → **Ajouter**.
9. Lance l'application depuis sa nouvelle icône. Ouvre-la une première fois avec Internet pour que les fichiers soient mis en cache, puis teste le mode avion.

### Utilisation
- Ajoute tes séries avec le champ en bas de l'écran.
- ◉ : exclure temporairement du tirage ; ○ : réintégrer.
- ✎ : modifier le nom.
- × : supprimer après confirmation.
- Le tirage évite le résultat précédent si au moins deux séries sont disponibles.
- L'historique conserve les 30 derniers tirages.

## Données et limites
- Les données restent dans le stockage local du navigateur sur cet iPhone. Elles ne sont ni envoyées ni synchronisées.
- Ne supprime pas les données du site dans Safari si tu veux conserver ta bibliothèque.
- Pour changer de téléphone ou de navigateur, les données ne suivent pas automatiquement.
- Une PWA hors ligne nécessite une première visite en ligne sur l'adresse HTTPS afin de télécharger le cache.
- Pour publier une mise à jour, remplace les fichiers du dépôt. Le nouveau cache sera pris en compte au prochain chargement après activation du nouveau service worker.

## Personnalisation
Tu peux modifier les couleurs dans `styles.css` (variables au début du fichier), et les textes directement dans `index.html`.
