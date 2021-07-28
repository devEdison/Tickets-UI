#!/usr/bin/env sh

# Asegúrese de que el script arroje el error encontrado
set -e

# Construye el proyecto
npm run build

# Entrar en la carpeta generada
cd build

git init
git add -A
git commit -m 'deploy'

# Si se publica en https: // <USERNAME> .github.io / <REPO>
#git push -f git@github.com:NLRX-WJC/Learn-Vue-Source-Code.git master:gh-pages

# Si usa la integración continua de travis
git push -f https://${GITHUB_TOKEN}@github.com/NLRX-WJC/react-antd-admin-template.git master:gh-pages

cd -