FROM node:carbon
WORKDIR /usr/src/app
COPY . /usr/src/app
RUN npm install pm2 -gN && npm install
EXPOSE 4004 4004
CMD ["npm", "run", "start"]