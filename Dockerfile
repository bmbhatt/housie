From node:lts AS compile-image
# RUN npm install -g yarn

WORKDIR /opt/ng
RUN mkdir housie-app
#COPY .npmrc package.json yarn.lock ./
COPY housie-app/package.json ./
# RUN yarn install
RUN npm install

ENV PATH="./node_modules/.bin:$PATH"

COPY housie-app/. ./
RUN ng build --prod
#RUN npm run build

FROM nginx:alpine
#COPY docker/nginx/default.conf /etc/nginx/conf.d/default.conf
COPY --from=compile-image /opt/ng/dist/housie-app /usr/share/nginx/html
EXPOSE 80

USER root
RUN apk update
RUN apk add openjdk8
RUN mkdir /opt/housie-service
WORKDIR /opt/housie-service
COPY housie-service/target/housie-service-0.0.4-SNAPSHOT.jar .
COPY housie-service/run-housie-service.sh .
ENTRYPOINT ./run-housie-service.sh
CMD ["nginx", "-g", "daemon off;"]
