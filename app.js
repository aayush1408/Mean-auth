const express = require('express');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');
const passport = require('passport');
const mongoose = require('mongoose');
const user = require('./routes/user.js');
const config = require('./config/database.js');

mongoose.connect(config.database);

mongoose.connection.on('connected', () => {
    console.log('Connected ' + config.database);
});

mongoose.connection.on('error', () => {
    console.log('Error connecting to db ' + err);
});

const app = express();

app.use('/user', user);

//Cors middleware
app.use(cors());

//Set up static folder
app.use(express.static(path.join(__dirname, 'public')));

//Bodyparser 
app.use(bodyParser.json());

//setup home route 
app.use('/', (req, res) => {
    res.send('Home');
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Port listening on ${port}`);
});