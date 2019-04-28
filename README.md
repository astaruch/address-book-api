# Address book API

[![Build Status](https://travis-ci.com/astaruch/address-book-api.svg?branch=master)](https://travis-ci.com/astaruch/address-book-api)
[![Dependencies](https://david-dm.org/astaruch/address-book-api.svg)](https://david-dm.org/astaruch/address-book-api.svg)
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
    - [ ] init project
    - [x] setup CI (+badge)
    - [ ] setup database
    - [x] setup Heroku (+badge)
    - [x] setup CD
    - [ ] setup firebase
    - [ ] setup test runner
- [ ] user signup/login
- [ ] add authentication
- [ ] create contact
- [ ] test coverage >90% (+badge)
