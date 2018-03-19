const express = require('express');
const path = require('path');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const user = require('./routes/user.js');
const config = require('./config/database.js');
const bodyParser = require('body-parser');
mongoose.connect(config.database);

mongoose.connection.on('connected', () => {
    console.log('Connected ' + config.database);
});

mongoose.connection.on('error', () => {
    console.log('Error connecting to db ' + err);
});

const app = express();


//Bodyparser 
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//Passport
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);

//Route setup
app.use('/user', user);

//Cors middleware
app.use(cors());

//Set up static folder
app.use(express.static(path.join(__dirname, 'public')));

//setup home route 
app.get('*', (req, res) => {
    res.sendFile('public/index.html', { root: __dirname });
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Port listening on ${port}`);
});