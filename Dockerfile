# build stage
FROM node:14 as build

# default env
ENV REACT_APP_FILER_PATH=/filer \
    REACT_APP_MASTER_PATH=/master

WORKDIR /app
COPY ./package.json ./
COPY ./yarn.lock ./
RUN yarn install --network-concurrency 1
COPY . ./
RUN yarn build

# final stage
FROM node:14

LABEL maintainer="bmswens@gmail.com"
EXPOSE 5000

WORKDIR /app

COPY --from=build /app/build ./build
RUN npm install -g serve

ENTRYPOINT ["serve", "-s", "build"]