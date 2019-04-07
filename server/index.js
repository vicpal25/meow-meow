const express = require('express');
const http = require('http');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const router = require('./router');
const expressValidator = require('express-validator');
const cors = require('cors');

var app = express();

mongoose.connect('mongodb://' + process.env.MONGO_DB, { useNewUrlParser: true });
mongoose.set('debug', true);

app.use(morgan('combined'));
app.use(cors());
app.use(bodyParser.json({ type : '*/*'}));
app.use(expressValidator());

const port = 3090; 
const server = http.createServer(app);

require('./router')(app);

server.listen(3090);

console.log('server listening on port ', port);
