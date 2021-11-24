# build stage
FROM node:14 as build

ARG FILER_HOST=localhost
ARG FILER_PORT=8888
ARG FILER_SCHEME=http

# default env
ENV REACT_APP_FILER_HOST=$FILER_HOST \
    REACT_APP_FILER_PORT=$FILER_PORT \
    REACT_APP_FILER_SCHEME=$FILER_SCHEME

WORKDIR /app
COPY ./package.json ./
COPY ./yarn.lock ./
RUN yarn
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