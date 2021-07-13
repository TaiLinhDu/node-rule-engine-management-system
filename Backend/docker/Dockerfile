FROM node:14

WORKDIR .

COPY evana-api/package*.json ./

RUN npm ci

COPY evana-api .

RUN npm run build

EXPOSE 3000
# PORT 3000

CMD ["npm", "start"]


