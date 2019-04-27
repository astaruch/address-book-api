# Address book API

The address book backend will be used for registering new accounts and managing their contacts.

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
    - [ ] setup CI (+badge)
    - [ ] setup database
    - [ ] setup Heroku (+badge)
    - [ ] setup CD
    - [ ] setup firebase
    - [ ] setup test runner
- [ ] user signup/login
- [ ] add authentication
- [ ] create contact
- [ ] test coverage >90% (+badge)