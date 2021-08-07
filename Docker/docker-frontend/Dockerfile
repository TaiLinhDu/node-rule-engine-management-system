FROM node:11 as node

WORKDIR /usr/src/app/frontend

COPY Frontend/package*.json ./

RUN npm ci

COPY Frontend .

RUN npm run build

# Stage 2
FROM nginx

COPY --from=node /usr/src/app/frontend/build /usr/share/nginx/html

COPY Docker/docker-frontend/nginx.conf /etc/nginx/conf.d/default.conf
