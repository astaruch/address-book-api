# Address book API

[![Build Status](https://travis-ci.com/astaruch/address-book-api.svg?branch=master)](https://travis-ci.com/astaruch/address-book-api)
[![Dependencies](https://david-dm.org/astaruch/address-book-api.svg)](https://david-dm.org/astaruch/address-book-api.svg)
[![Test Coverage](https://api.codeclimate.com/v1/badges/ad6d3d3df924190db2cf/test_coverage)](https://codeclimate.com/github/astaruch/address-book-api/test_coverage)
[![Maintainability](https://api.codeclimate.com/v1/badges/ad6d3d3df924190db2cf/maintainability)](https://codeclimate.com/github/astaruch/address-book-api/maintainability)
[![Heroku](https://heroku-badge.herokuapp.com/?app=strv-address-book-staruch-andr)](https://heroku-badge.herokuapp.com/?app=strv-address-book-staruch-andr)


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

## TODO
- [ ] setup project
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
