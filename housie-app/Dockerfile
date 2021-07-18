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

# Copy our custom nginx config
COPY nginx-custom.conf /etc/nginx/conf.d/default.conf

# Expose port 80 to the Docker host, so we can access it 
# from the outside.
EXPOSE 80

ENTRYPOINT ["nginx","-g","daemon off;"]
