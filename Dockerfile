FROM node:18
RUN mkdir /usr/src/app
WORKDIR /usr/src/app
COPY . .
RUN npm install
EXPOSE 3333
CMD ["npm", "run", "dev:server"]
