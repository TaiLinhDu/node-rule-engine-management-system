FROM node:11 as node

WORKDIR /usr/src/app/json-rule-editor

COPY json-rule-editor/package*.json ./

RUN npm ci

COPY Frontend .

RUN npm run build

#Stage 2
FROM nginx

COPY --from=node /usr/src/app/json-rule-editor/build /usr/share/nginx/html/

COPY Docker/docker-json-rule-editor/nginx.conf /etc/nginx/conf.d/default.conf
