FROM node:12.18-alpine
ENV NODE_ENV production
ENV PORT 80
EXPOSE 80

WORKDIR /usr/src/app
COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]
RUN npm install --production --silent && mv node_modules ../
COPY . .
RUN npm i nodemon -g

CMD npm start