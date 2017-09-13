var express = require('express');
var morgan = require('morgan');
var path = require('path');
var bodyParser = require('body-parser');

var app = express();
app.set ('port', (process.env.PORT || 3000));

app.use('/', express.static(__dirname + '/dist'));
app.use('/scripts', express.static(__dirname + '/node_modules'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(morgan('dev'));

app.use(function (req, res, next) {
    if (path.extname(req.path).length > 0) {
        // normal static file request
        next();
    }
    else {
        // redirect all html requests to `index.html`
        res.sendFile(path.resolve(__dirname + '/dist/index.html'));
    }
});

app.listen(app.get('port'), function() {
    console.log('Listening on port '+ app.get('port'));
});

