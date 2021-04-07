FROM node
WORKDIR /Portfolio
COPY package.json package.json
RUN npm install
COPY . ./
CMD [ "node", "index.js" ]
