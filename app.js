const express = require('express');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');
const passport = require('passport');
const mongoose = require('mongoose');
const user = require('./routes/user.js');

const app = express();

app.use('/user', user);

//Cors middleware
app.use(cors());

//Bodyparser 
app.use(bodyParser.json());

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Port listening on ${port}`);
});