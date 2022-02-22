# build stage
FROM node:16 as build

ARG VERSION_INFO=DEV

# default env
ENV REACT_APP_FILER_PATH=/filer \
    REACT_APP_MASTER_PATH=/master \
    REACT_APP_KELP_VERSION=${VERSION_INFO}

WORKDIR /app
COPY ./package.json ./
COPY ./package-lock.json ./
RUN npm config set fetch-retry-maxtimeout=300000
RUN npm install 
COPY . ./
RUN npm run build

# final stage
FROM node:14

LABEL maintainer="bmswens@gmail.com"
EXPOSE 5000

WORKDIR /app

COPY --from=build /app/build ./build
RUN npm install -g serve

ENTRYPOINT ["serve", "-s", "build"]
