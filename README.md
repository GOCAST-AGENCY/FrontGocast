# Frontend GoCast Agency

Frontend React pour l'application GoCast Agency avec Ant Design.

## 🚀 Démarrage rapide

### Prérequis

- Node.js (version 18 ou supérieure)
- npm

### Installation

1. Installer les dépendances
```bash
npm install
```

2. Démarrer le serveur de développement
```bash
npm run dev
```

L'application sera accessible sur `http://localhost:3001`

⚠️ **Important:** Assurez-vous que le backend est démarré sur le port 3000.

## 📁 Structure du projet

```
FrontGocast/
├── src/
│   ├── components/      # Composants réutilisables
│   │   ├── AppLayout.jsx
│   │   └── Logo.jsx
│   ├── context/         # Context API (AuthContext)
│   ├── pages/           # Pages de l'application
│   │   ├── Home.jsx
│   │   ├── Login.jsx
│   │   ├── Dashboard.jsx
│   │   ├── TalentProfile.jsx
│   │   └── About.jsx
│   ├── App.jsx          # Composant principal
│   ├── main.jsx         # Point d'entrée
│   └── index.css        # Styles globaux
├── index.html
├── vite.config.js
├── package.json
└── README.md
```

## 📝 Scripts disponibles

- `npm run dev` - Démarre le serveur de développement
- `npm run build` - Compile l'application pour la production
- `npm run preview` - Prévisualise la version de production

## 🎨 Design

Le design suit l'identité visuelle GoCast :
- **Logo:** "GOCAST" avec le O stylisé en objectif de caméra (rouge #E50914)
- **Police:** Bebas Neue pour le logo
- **Couleurs:** Noir profond (#111111), Rouge ciné (#E50914)
- **Framework UI:** Ant Design

## 📄 Pages

- **Accueil** (`/`) - Présentation et statistiques
- **Connexion** (`/login`) - Authentification administrateur
- **Tableau de bord** (`/dashboard`) - Liste et gestion des talents
- **Profil Talent** (`/talent/:id`) - Détails complets d'un talent
- **À propos** (`/about`) - Informations sur l'agence

## 🔐 Authentification

L'authentification est gérée via JWT stocké dans le localStorage. Les routes protégées nécessitent une connexion.

## 🛠️ Technologies utilisées

- **React 18** - Bibliothèque UI
- **React Router** - Routage
- **Ant Design** - Composants UI
- **Axios** - Requêtes HTTP
- **Vite** - Build tool
- **Day.js** - Gestion des dates

## 📄 Licence

ISC
