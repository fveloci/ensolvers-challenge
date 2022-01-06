# ensolvers-challenge

## Important!
Before execute scripts in backend folder you need to delete .example in .env.example file. After that you must create a new database with the same name as the .env file and the same credentials. Also you need to run MYSQL virtual server like XAMPP, otherwise backend is not going to work.

## Implementation exercise

For this exercise I made Angular Frontend App and two Backend Apps (Express and NestJS)

##### - Angular v12.2.10

##### - Node v12.18.2 with Express v4.17.2 and this dependencies:
```json
{
  "bcrypt": "^5.0.1",
  "cors": "^2.8.5",
  "dotenv": "^10.0.0",
  "express": "^4.17.2",
  "jsonwebtoken": "^8.5.1",
  "morgan": "^1.10.0",
  "mysql2": "^2.3.3",
  "nodemon": "^2.0.15",
  "sequelize": "^7.0.0-alpha.2",
  "sequelize-cli": "^6.3.0"
}
```
##### - NestJS v8.0.0 and TypeORM v8.0.2 with this dependencies:
```json
{
    "@nestjs/common": "^8.0.0",
    "@nestjs/config": "^1.1.6",
    "@nestjs/core": "^8.0.0",
    "@nestjs/jwt": "^8.0.0",
    "@nestjs/passport": "^8.0.1",
    "@nestjs/platform-express": "^8.0.0",
    "@nestjs/typeorm": "^8.0.2",
    "bcrypt": "^5.0.1",
    "mysql2": "^2.3.3",
    "nestjs-pino": "^2.4.0",
    "passport": "^0.5.2",
    "passport-jwt": "^4.0.0",
    "passport-local": "^1.0.0",
    "pino-http": "^6.5.0",
    "reflect-metadata": "^0.1.13",
    "rimraf": "^3.0.2",
    "rxjs": "^7.2.0",
    "typeorm": "^0.2.41"
  }
```

Node and Angular are necessary to run each application. And in this case I use XAMMP to run MYSQL local host database.

## Login (Default credentials)
Default user/password are not provided. I created a login and register components and each one can have their own folders and tasks.

## Angular

### Prerequisites
- Install Node.js which includes Node Package Manager

### Setting up Project
- Install the Angular CLI globally:

```
npm install -g @angular/cli
```
- Install dependencies (run this command inside frontend project folder): 
```
npm install
```

- Run the application:
```
ng serve
```

## Nest backend server
If you follow Angular prerequisites you don´t need to install Node.
- Install Nest CLI
```
npm i -g @nestjs/cli
```

- Install libraries and packages (run this command inside backend project folder):
```
npm install
```
- Create new database with the same database name you are going to have in .env file. Otherwise API is not going to connect.

- Run:
```
npm start
```
this command is going to create database tables, after that check if application is running correctly.

## Express backend server
If you follow Angular prerequisites you don´t need to install Node.

- Install libraries and packages (run this command inside backend project folder):
```
npm install
```
- Create new database with the same database name you are going to have in .env file. Otherwise API is not going to connect.
- Run:
```
npm sequelize-cli db:migrate
```
This command is going to run migrations and create database tables with their relations.

- After this steps, we can run:
```
npm start
```
and check if application is running correctly.

## Scripts

###### Scripts to run each app are in their respective folders.
