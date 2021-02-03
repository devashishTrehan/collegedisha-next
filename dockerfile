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




# FROM node:current-alpine AS base
# WORKDIR /base
# COPY package*.json ./
# RUN npm install
# COPY . .

# FROM base AS build
# ENV NODE_ENV=production
# WORKDIR /build
# COPY --from=base /base ./
# RUN npm run build

# FROM node:current-alpine AS production
# ENV NODE_ENV=production
# WORKDIR /app
# COPY --from=build /build/package*.json ./
# COPY --from=build /build/.next ./.next
# COPY --from=build /build/public ./public
# RUN npm install next

# EXPOSE 3000
# CMD npm run start