const express = require('express');
//const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());


//app.use('/messages', require('./routes/messages'));

//Defaults to send index.html
app.use(express.static(__dirname + '/client-src'));
app.use('/messages', require('./routes/messages'));
app.use('/', (req, res) => {res.redirect('/');});

app.listen(3000);