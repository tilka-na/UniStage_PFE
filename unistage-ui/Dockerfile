# ./unistage-ui/Dockerfile.dev
FROM node:20-alpine

WORKDIR /app

# Install Angular CLI globally inside the container
RUN npm install -g @angular/cli@17

COPY package*.json ./
RUN npm install

COPY . .

# Run the live development server with polling enabled
CMD ["ng", "serve", "--host", "0.0.0.0", "--port", "4200", "--poll", "2000"]
