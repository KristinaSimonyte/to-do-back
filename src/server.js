const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const authRouter = require('./routes/authRoutes');
const tasksRouter = require('./routes/tasksRoutes');
require('dotenv').config();

const app = express();
const { PORT } = process.env;

app.use(morgan('dev'));
app.use(express.json());
app.use(cors());

app.use('/auth', authRouter);
app.use('/tasks', tasksRouter);

app.listen(PORT, console.log('Runing on por ${PORT}'));
