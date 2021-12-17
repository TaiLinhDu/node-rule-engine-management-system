FROM nginx:alpine
 
COPY nginx.conf /etc/nginx/nginx.conf

RUN apk update && apk add bash
docker build -t nginx-alpine .
docker run -t -i nginx-alpine /bin/bash