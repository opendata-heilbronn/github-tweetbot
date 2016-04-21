var Twitter = require('twitter');
var express = require('express');
var moment = require('moment');
var bodyParser = require('body-parser');
var app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post('/', function (req, res) {

    console.log(req.body);
    
    var user = '';
    var repository = '';
    var message = '';
    
    if (req.body.pusher && req.body.pusher.name) { user = req.body.pusher.name; }
    if (req.body.repository && req.body.repository.name) { repository = req.body.repository.name; }
    if (req.body.head_commit && req.body.head_commit.message) { message = req.body.head_commit.message; }

    var client = new Twitter({
        consumer_key: 'jf8Xy34VdKtX6reGIjpTgKWIq',
        consumer_secret: '7jI2pciqaTWKOx8y7FHguBX7MkaoceeFWZAJRQAawn4OrieIGq',
        access_token_key: '723193515883126786-jW4kxes7RDD9v6x3Xei3kOveeb3K8cQ',
        access_token_secret: '6qdNBZVHsnxL5EMYemFMc2qci2YDGg53kp6WzIiksTx83'
    });
    
    var text = moment().format('DD.MM.YYYY hh:mm') + ' - @' + user + ' commited to ' + repository + " - msg:" + message;
    if (text.length > 140 ) {
        text = text.substr(0, 136) + "...";
    }

    client.post('statuses/update', { status: text }, function (error, tweet, response) {
        if (error) throw error;
        console.log(tweet);  // Tweet body. 
        console.log(response);  // Raw response object. 
    });
    
    res.json({success: true});
});

var port = 8080;
app.listen(port);
console.log('Express server started on port %s', port);

