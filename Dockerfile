FROM node:alpine

# Labels
LABEL version="1.0"
LABEL description="Prototipo de base para imagen de Docker"
LABEL maintainer="juancristianmiguel@gmail.com"

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./
COPY . .

RUN npm install
# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
#COPY . .
#WORKDIR ./client
RUN npm run build

ENV PORT 8080
EXPOSE $PORT
CMD [ "npm", "start" ]
