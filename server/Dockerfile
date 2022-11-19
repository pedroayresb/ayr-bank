FROM node:14.14.0-alpine
WORKDIR /app
COPY ./package*.json .
RUN npm install
COPY . .
RUN cd app
CMD ["USERNAME=postgres", "PASSWORD=postgres_password", "HOST=postgres", "DATABASE=ng-project", "npm", "run", "dev"]
