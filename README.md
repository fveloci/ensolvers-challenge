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

## Before run Node+Express Backend API use command:

- Create a new database with the same name that you have in your .env file. Otherwise API is not going to connect to database and next step is not possible.
- npx sequelize-cli db:migrate > (to create database tables with their relations)
