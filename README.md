# Kelp

[![Test](https://github.com/bmswens/Kelp/actions/workflows/test.yml/badge.svg?branch=master)](https://github.com/bmswens/Kelp/actions/workflows/test.yml)
[![Docker Build](https://img.shields.io/badge/Docker%20Build-Automated-brightgreen)](https://github.com/bmswens/Kelp/actions/workflows/build.yml)
[![Docker Pulls](https://img.shields.io/docker/pulls/bmswens/kelp)](https://hub.docker.com/repository/docker/bmswens/kelp)
[![Liscense](https://img.shields.io/github/license/bmswens/kelp)](https://github.com/bmswens/Kelp/blob/master/LICENSE.txt)

---

![Kelp Logo](https://github.com/bmswens/Kelp/blob/master/public/kelp.png?raw=true)

## About

Kelp is a web-based GUI for SeaweedFS, meant to emulate the look and feel of a native file explorer.

## Getting Started

### Requirements

 * NodeJS
 * docker
 * docker-compose

### Dev

You can get started developing in a "hot-reload" environment with these lines.

Note: in this environment, you won't be able to get cluster information from `weed master` due to `cors` issues. 
```
git clone https://github.com/bmswens/Kelp.git
cd Kelp
yarn install
npm run start:dev
```

### Staging
This environment will build a stack and emulate a cluster deployment with nginx as a proxy.
```
git clone https://github.com/bmswens/Kelp.git
cd Kelp
yarn install
npm run start:staging
```

## Built with

* [NodeJS](https://nodejs.org/)
* [React](https://reactjs.org/)
* [Material-UI](https://material-ui.com/)
* [SeaweedFS](https://github.com/chrislusf/seaweedfs)

## Authors

* **Brandon Swenson**- *Initial work* - [bmswens](https://github.com/bmswens)

## License

This project is licensed under the Apache 2.0 License - see the [LICENSE.txt](LICENSE.txt) file for details