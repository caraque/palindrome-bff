FROM node:12
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY package.json /usr/src/app
ENV MONGO_USER=productListUser
ENV MONGO_PASS=productListPassword
ENV MONGO_URL=localhost
RUN npm install
COPY . /usr/src/app
CMD ["npm","start"]

