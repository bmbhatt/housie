From node:14.4.0 AS compile-image
# RUN npm install -g yarn

WORKDIR /opt/ng
#COPY .npmrc package.json yarn.lock ./
COPY housie-app/package.json ./
# RUN yarn install
RUN npm install

ENV PATH="./node_modules/.bin:$PATH"

COPY housie-app/. ./
RUN ng build --prod
#RUN npm run build

FROM nginx
#COPY docker/nginx/default.conf /etc/nginx/conf.d/default.conf
COPY --from=compile-image /opt/ng/dist/housie-app /usr/share/nginx/html
