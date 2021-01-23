FROM node
WORKDIR /usr/src/app
COPY package.json package.json
COPY package-lock.json package-lock.json
RUN npm install
COPY . ./
CMD [ "node", "Server.js" ]
