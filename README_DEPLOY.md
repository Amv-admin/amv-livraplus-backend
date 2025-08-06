# Amv LivraPlus - Backend (Express + SQLite)

## Déploiement rapide (Render)
1. Poussez ce dossier sur un repo GitHub.
2. Connectez-vous à https://render.com et cliquez **New +** > **Blueprint**.
3. Sélectionnez ce repo. Render détecte `render.yaml`.
4. À la première build, Render exécutera `npm run seed` pour créer la base.
5. Notez l'URL publique, ex: `https://amv-livraplus-api.onrender.com`.

## Déploiement (Fly.io, option)
```bash
flyctl launch --no-deploy
flyctl deploy
```

## Variables d'environnement
- `JWT_SECRET` (obligatoire en prod)
- Clés des opérateurs Mobile Money (si intégration réelle)
