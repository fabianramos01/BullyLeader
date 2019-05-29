const express = require('express');
const app = express();
const axios = require('axios');
const morgan = require('morgan');

var routes = require('./routes');
var leader = require('./selectLeader');

bodyParser = require('body-parser');
app.use(bodyParser.json());

app.set('view engine', 'ejs');
app.set('views', __dirname + '/pages');

app.use(morgan('short'));

app.use(routes);

app.use(leader);

/*
app.use(function (req, res, next) {
    console.log('--------------------');
    console.log('Request url: ' +  req.url);
    console.log('Request IP: ' +  req.ip);
    next();
});
*/

app.post('/hi', function(req, res, next) {
    console.log(req.body);
    res.send("ok");
});

app.listen(3030, () => console.log(`Example app listening on port $3030!`))