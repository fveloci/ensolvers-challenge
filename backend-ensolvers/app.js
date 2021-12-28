const express = require('express')
const app = express();
const { sequelize } = require('./src/database/models/index')
const cors = require('cors')
const morgan = require('morgan')
const auth = require('./src/middlewares/auth');

app.use(cors());
app.options('*', cors());
const PORT = process.env.PORT || 3000;
const URL = process.env.API_URL;

app.use(express.json());
app.use(morgan('tiny'))
app.use(express.urlencoded({extended: 'false'}));

// Routes
const authRouter = require('./src/routes/authRouter')
const folderRouter = require('./src/routes/folderRouter')
const taskRouter = require('./src/routes/taskRouter');

app.use(`${URL}/auth`, authRouter);
app.use(`${URL}/folder`, auth, folderRouter);
app.use(`${URL}/task`, auth, taskRouter);


app.listen(PORT, () => {
    console.log(`Server is running in PORT: ${PORT}`);
    sequelize.authenticate()
    .then(() => {
        console.log('Connect to database')
    })
    .catch((err) => {
        console.error('Database connection error', err)
    })
})
