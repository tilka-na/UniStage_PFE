# L'étape 1 : Kandiro build l projet Angular dyalna
FROM node:22-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build --configuration=production

# L'étape 2 : Kan7etto l'projet f serveur Nginx bach yban f l'navigateur
FROM nginx:alpine
# Hna t2eked bli smit dossier "internship-frontend" hiya li 3ndk f angular.json
COPY --from=build /app/dist/internship-frontend/browser /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]