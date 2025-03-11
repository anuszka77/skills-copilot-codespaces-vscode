// Create web server

var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var fs = require('fs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/public/index.html');
});

app.get('/comments', function(req, res) {
    fs.readFile(__dirname + '/public/comments.json', 'utf8', function(err, data) {
        res.setHeader('Content-Type', 'application/json');
        res.send(data);
    });
});

app.post('/comments', function(req, res) {
    fs.readFile(__dirname + '/public/comments.json', 'utf8', function(err, data) {
        data = JSON.parse(data);
        data.push(req.body);
        fs.writeFile(__dirname + '/public/comments.json', JSON.stringify(data, null, 4), function(err) {
            res.setHeader('Content-Type', 'application/json');
            res.send(JSON.stringify(data));
        });
    });
});

app.listen(3000, function() {
    console.log('Server is running on port 3000');
});