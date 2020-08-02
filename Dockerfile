From node:14.4.0 AS compile-image
# RUN npm install -g yarn

WORKDIR /opt/ng
RUN mkdir housie-app
#COPY .npmrc package.json yarn.lock ./
COPY package.json ./
# RUN yarn install
RUN npm install

ENV PATH="./node_modules/.bin:$PATH"

COPY . ./
RUN ng build --prod
#RUN npm run build

FROM nginx
#COPY docker/nginx/default.conf /etc/nginx/conf.d/default.conf
COPY --from=compile-image /opt/ng/dist/housie-app /usr/share/nginx/html

FROM openjdk:8
RUN mkdir /opt/housie-service
WORKDIR /opt/housie-service
COPY ./target/housie-service-0.0.3-SNAPSHOT.jar .
COPY run-housie-service.sh .
ENTRYPOINT ./run-housie-service.sh

