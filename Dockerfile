FROM node:9.3.0-alpine

COPY package.json /tmp/package.json
RUN cd /tmp && npm install
RUN mkdir -p /code && cp -a /tmp/node_modules /code

WORKDIR /code
COPY . /code

CMD [ "npm", "start" ]
