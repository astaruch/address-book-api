# Address book API

[![Build Status](https://travis-ci.com/astaruch/address-book-api.svg?branch=master)](https://travis-ci.com/astaruch/address-book-api)
[![Dependencies](https://david-dm.org/astaruch/address-book-api.svg)](https://david-dm.org/astaruch/address-book-api.svg)
[![Test Coverage](https://api.codeclimate.com/v1/badges/ad6d3d3df924190db2cf/test_coverage)](https://codeclimate.com/github/astaruch/address-book-api/test_coverage)
[![Maintainability](https://api.codeclimate.com/v1/badges/ad6d3d3df924190db2cf/maintainability)](https://codeclimate.com/github/astaruch/address-book-api/maintainability)
[![Heroku](https://heroku-badge.herokuapp.com/?app=strv-address-book-staruch-andr)](https://strv-address-book-staruch-andr.herokuapp.com/)


The address book backend will be used for registering new accounts and managing their contacts.

Application is running on [Heroku](https://strv-address-book-staruch-andr.herokuapp.com/).

## Requirements

- continuous integration (Travis/Heroku/Jenkins)
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


#### Example requests

|  Title | URL   | Method   | Data params  | Success response code |
|---|---|---|---|---|
| Create user  |  /users |  POST |  {email: [string], password: [string]} |  201 |
| Login user  |  /session/user | POST  | {email: [string], password: [string]}  | 201  |
| Create contact   |  /contacts | POST   | {email: [string], name: [string], number: [string]}  | 201  |
Create user



    $ # REQUEST
    $ curl -X POST \
        https://strv-address-book-staruch-andr.herokuapp.com/users \
        -H 'Content-Type: application/json' \
        -H 'Postman-Token: 5c8dcc0d-8a6e-4788-8f18-d67d337a13f3' \
        -H 'cache-control: no-cache' \
        -d '{
            "email": "test@gmail.com",
            "password": "very strong password"
        }'

    $ # RESPONSE
    {
        "id": 3,
        "email": "test@gmail.com",
        "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjMsImlhdCI6MTU1NjgwODYyNCwiZXhwIjoxNTU2ODEyMjI0LCJpc3MiOiJjb20uaGVyb2t1YXBwLnN0cnYtYWRkcmVzcy1ib29rLXN0YXJ1Y2gtYW5kci5wcm9kdWN0aW9uIn0.GjC8dq6s6Q-fm0_gwG4jqmpx9-KAPQIk7fXnT7ReKbA"
    }

Login user

    $ # REQUEST
    $ curl -X POST \
        https://strv-address-book-staruch-andr.herokuapp.com/session/user \
        -H 'Content-Type: application/json' \
        -H 'Postman-Token: 8d055b75-88d7-42e4-85a0-ae5210640ab5' \
        -H 'cache-control: no-cache' \
        -d '{
            "email": "test@gmail.com",
            "password": "very strong password"
        }'

    $ # RESPONSE
    {
        "id": 3,
        "email": "test@gmail.com",
        "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjMsImlhdCI6MTU1NjgwODg5MiwiZXhwIjoxNTU2ODEyNDkyLCJpc3MiOiJjb20uaGVyb2t1YXBwLnN0cnYtYWRkcmVzcy1ib29rLXN0YXJ1Y2gtYW5kci5wcm9kdWN0aW9uIn0.YHm2xGLXeIThD0MXMcMJy-OGIsaMsw5XHGpyvPLaOPw"
    }

Create contact for logged user

    $ # REQUEST
    $ curl -X POST \
        https://strv-address-book-staruch-andr.herokuapp.com/contacts \
        -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjMsImlhdCI6MTU1NjgwODg5MiwiZXhwIjoxNTU2ODEyNDkyLCJpc3MiOiJjb20uaGVyb2t1YXBwLnN0cnYtYWRkcmVzcy1ib29rLXN0YXJ1Y2gtYW5kci5wcm9kdWN0aW9uIn0.YHm2xGLXeIThD0MXMcMJy-OGIsaMsw5XHGpyvPLaOPw' \
        -H 'Content-Type: application/json' \
        -H 'Postman-Token: 22bbd0cf-dde9-4523-a03e-4f8bb849b525' \
        -H 'cache-control: no-cache' \
        -d '{
            "number": "+421 903 123 456",
            "email": "some_other_email@yahoo.com",
            "name": "Jozko Mrkvicka"
        }'

    $ # RESPONSE
    {
        "-Ldt23-FWRXcwvjhZFVv": {
            "email": "some_other_email@yahoo.com",
            "name": "Jozko Mrkvicka",
            "number": "+421 903 123 456",
            "owner": 3
        }
    }
