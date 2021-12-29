# ensolvers-challenge
## Implementation exercise

For this exercise I used:

##### - Angular v12.2.10

##### - Node v12.18.2 with Express v4.17.2 and this libraries:
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

Node and Angular are necessary to run each application. And in this case I use XAMMP to run MYSQL local host database.

## Angular

### Prerequisites
- Install Node.js which includes Node Package Manager

### Setting up a Project
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

