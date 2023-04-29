# Fullstack app

Simple fullstack app to test how to implement a db in a website with js

## Modules required
```
run the following commands in the /server folder
- npm init -y
- npm install experss
- npm install mysql
- npm install dotenv
- npm install -g nodemon --save-dev 
- npm install cors

If you have problems with db connection (like me) try to use this module:
- npm install mysql2
then change on dbService.js
- const mysql = require('mysql2')
```
## Setup project
```
- create .env file in the /server folder
- define on .env file the:
  - PORT
  - DB_USER
  - DB_PASSWORD
  - DATABASE
  - DB_PORT
  - HOST
```
