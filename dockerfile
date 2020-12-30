FROM node:12

ENV PORT 3000

# Create app directory
RUN mkdir -p /balj/src/collegedisha
WORKDIR /balj/src/collegedisha

# Installing dependencies
COPY package*.json /balj/src/collegedisha/
RUN npm install

# Copying source files
COPY . /balj/src/collegedisha

# Building app
RUN npm run build
EXPOSE 3000

# Running the app
CMD "npm" "run" "dev"