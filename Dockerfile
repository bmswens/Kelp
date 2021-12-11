# build stage
FROM node:16 as build

ARG VERSION_INFO=DEV

# default env
ENV REACT_APP_FILER_PATH=/filer \
    REACT_APP_MASTER_PATH=/master \
    REACT_APP_KELP_VERSION=${VERSION_INFO}

WORKDIR /app
COPY ./package.json ./
COPY ./yarn.lock ./
COPY ./.yarnrc.yml ./
COPY ./.yarn/releases/yarn-3.1.1.cjs ./.yarn/releases/
RUN yarn set version berry
RUN yarn install --network-timeout 300000
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
