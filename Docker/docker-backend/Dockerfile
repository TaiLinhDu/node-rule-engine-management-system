FROM node:14

WORKDIR .

COPY Backend/package*.json ./

RUN npm ci

COPY Backend .

RUN npm run build

EXPOSE 3000
# PORT 3000

CMD ["npm", "start"]


