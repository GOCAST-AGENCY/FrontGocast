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

2. Configurer les variables d'environnement

Créez un fichier `.env.local` à la racine du projet :

**Pour le développement local (localhost):**
```env
VITE_API_URL=http://localhost:3000
```

**Pour utiliser l'API de production (Render):**
```env
VITE_API_URL=https://backendgocast.onrender.com
```

3. Démarrer le serveur de développement
```bash
npm run dev
```

L'application sera accessible sur `http://localhost:3001`

⚠️ **Important:** 
- Assurez-vous que le backend est démarré sur le port 3000 (si vous utilisez localhost)
- Après modification du `.env.local`, redémarrez le serveur de développement

## 📁 Structure du projet

```
FrontGocast/
├── src/
│   ├── components/      # Composants réutilisables
│   │   ├── AppLayout.jsx
│   │   └── Logo.jsx
│   ├── config/          # Configuration (API URLs)
│   │   └── api.js
│   ├── context/         # Context API (AuthContext)
│   ├── pages/           # Pages de l'application
│   │   ├── Login.jsx
│   │   ├── Dashboard.jsx
│   │   └── TalentProfile.jsx
│   ├── App.jsx          # Composant principal
│   ├── main.jsx         # Point d'entrée
│   └── index.css        # Styles globaux
├── .env.local           # Variables d'environnement (non commité)
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

- **Connexion** (`/login`) - Authentification administrateur
- **Tableau de bord** (`/dashboard`) - Liste et gestion des talents
- **Profil Talent** (`/talent/:id`) - Détails complets d'un talent

## ⚙️ Configuration de l'API

L'URL de l'API backend est configurée via la variable d'environnement `VITE_API_URL` dans le fichier `.env.local`.

- **Localhost:** `VITE_API_URL=http://localhost:3000`
- **Production:** `VITE_API_URL=https://backendgocast.onrender.com`

Voir `ENV_CONFIG.md` pour plus de détails.

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
