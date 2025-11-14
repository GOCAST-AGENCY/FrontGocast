# Configuration des Variables d'Environnement

## Fichier .env.local

Créez un fichier `.env.local` à la racine du projet `FrontGocast` avec le contenu suivant :

### Pour le développement local (localhost)
```env
VITE_API_URL=http://localhost:3000
```

### Pour utiliser l'API de production (Render)
```env
VITE_API_URL=https://backendgocast.onrender.com
```

## Comment ça fonctionne

1. **En développement** : Utilisez `VITE_API_URL=http://localhost:3000` pour pointer vers votre backend local
2. **En production** : Utilisez `VITE_API_URL=https://backendgocast.onrender.com` pour pointer vers votre backend déployé

## Important

- Le fichier `.env.local` n'est **pas commité** dans Git (déjà dans `.gitignore`)
- Les variables d'environnement Vite doivent commencer par `VITE_` pour être accessibles dans le code
- Après modification du `.env.local`, **redémarrez le serveur de développement** (`npm run dev`)

## Exemple de fichier .env.local

```env
# Configuration locale
# Changez cette valeur selon votre environnement

# Pour localhost:
VITE_API_URL=http://localhost:3000

# Pour production:
# VITE_API_URL=https://backendgocast.onrender.com
```

