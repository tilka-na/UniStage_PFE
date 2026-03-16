FROM node:20 as build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
# Run build and then list what's inside dist so we can see it in the logs
RUN npm run build && ls -R dist/

FROM nginx:alpine
# Remove default nginx static assets
RUN rm -rf /usr/share/nginx/html/*

# Copy from the build stage.
# We use the wildcard * to grab everything inside the subfolder.
# Most likely path for Angular 17+: /app/dist/unistage-ui/browser/
COPY --from=build /app/dist/unistage-ui/browser/ /usr/share/nginx/html/

# If the command above fails, try this one instead:
# COPY --from=build /app/dist/unistage-ui/ /usr/share/nginx/html/

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
