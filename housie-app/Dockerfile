From node:lts AS compile-image
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
