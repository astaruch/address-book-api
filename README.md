# Address book API

[![Build Status](https://travis-ci.com/astaruch/address-book-api.svg?branch=master)](https://travis-ci.com/astaruch/address-book-api)
[![Dependencies](https://david-dm.org/astaruch/address-book-api.svg)](https://david-dm.org/astaruch/address-book-api.svg)
[![Test Coverage](https://api.codeclimate.com/v1/badges/ad6d3d3df924190db2cf/test_coverage)](https://codeclimate.com/github/astaruch/address-book-api/test_coverage)
[![Maintainability](https://api.codeclimate.com/v1/badges/ad6d3d3df924190db2cf/maintainability)](https://codeclimate.com/github/astaruch/address-book-api/maintainability)
[![Heroku](https://heroku-badge.herokuapp.com/?app=strv-address-book-staruch-andr)](https://strv-address-book-staruch-andr.herokuapp.com/)


The address book backend will be used for registering new accounts and managing their contacts.

Application is running on [Heroku](https://strv-address-book-staruch-andr.herokuapp.com/).

## Requirements

- continues integration (Travis/Heroku/Jenkins)
- deploy (Heroku/AWS ECS/AWS EC2)
- Node.js + Koa/Express
- HTTP responses following best practices
- JSON as data exchange
- stateless authentication
- user accounts stored in database
    - user signup/login
- user contacts stored in Firebase
    - create new contact
- tests
- it's not needed to implement GET/UPDATE/DELETE

## Development setup

There are several problems with Typescript+knex compatibility and Node+bcrypt version. Right now, working versions are:
- knex@0.15.2 - [issue](https://github.com/tgriesser/knex/issues/2998)
- Node v10.12.0 + bcrypt@3.0.6 - [info](https://stackoverflow.com/questions/46384591/node-was-compiled-against-a-different-node-js-version-using-node-module-versio)

> Firebase credentials
Download firebase credentials ([docs](https://firebase.google.com/docs/admin/setup?authuser=0#initialize_the_sdk)) and store it into `address-book-api/src/config/service-account-file.json` or on production server store it in environmental variable $FIREBASE_SERVICE_ACOUNT. 

#### Steps

    $ cd address-book-api
    $ docker-compose up -d
    $ npm install

    # Prepare json for root route
    $ node make-build-info.js

    $ # Code quality tools
    $ npm run lint
    $ npm run coverage

    $ # Prepare database
    $ npm run migrate

    $ # Start development Typescript server with reloading after file change
    $ npm run dev

    $ # Start production server
    $ npm run build
    $ npm start


## TODO
- [x] setup project
    - [x] init project
    - [x] setup CI (+badge)
    - [x] setup database
    - [x] setup Heroku (+badge)
    - [x] setup CD
    - [x] setup firebase
    - [x] setup test runner
- [x] user signup/login API
    - [x] add tests
    - [ ] fix tests
- [x] add authentication
    - [ ] add tests
- [x] create contact API
    - [ ] add tests
- [ ] overall API tests
- [ ] test coverage >90% (+badge)
