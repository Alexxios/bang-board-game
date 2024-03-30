FROM node:alpine

WORKDIR ./bang_frontend

COPY . . 

RUN npm install 

CMD ["npm", "start"]
