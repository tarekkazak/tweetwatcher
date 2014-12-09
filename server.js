var q = require('q');
var express = require('express');
var _ = require('lodash');
app = express();
app.use(express.static('.'));
// Twitter OAuth
var key = 'P4PqVvpkwYkSscdtUZ6yPEb8h';
var secret ='dBqK4r3VUJ8V3k0N2JuQzTh24oYUyOk74ATfZXsk4aInNjkEYR'; 
var token = '47752798-WVx7SajqMObhcRuo36dqdXDCuQf5LuCeXtXMt4rKS';
var tokenSecret = 'hdfVN92w5yKMaHdRt7ymRbXZlFNV5SjpX9MPPHXaUZ6Eu';

var util = require('util'),
    twitter = require('twitter');
var twit = new twitter({
    consumer_key: key,
    consumer_secret: secret,
    access_token_key: token,
    access_token_secret: tokenSecret
});


function getTweetsForUser(user) {
    var defer = q.defer()
    twit.get('/statuses/user_timeline.json', {"screen_name":user, "count":30, "contributor_details":true }, function(data, res) {
        //console.log(util.inspect(data[0]), res.statusCode);
        defer.resolve(data);
    });
    return defer.promise;
}

app.get('/tweets/:user', function(req, res, next) {
    console.log(req.params.user);

    getTweetsForUser(req.params.user).then(function(result) {
        res.json(result);
    });
});

app.listen('2200', function() {
    console.log('app running on 2200');   
});
