var express = require('express');
var morgan = require('morgan');
var path = require('path');
var bodyParser = require('body-parser');
var parseUrlencoded = bodyParser.urlencoded({ extended: false });

var app = express();
app.set ('port', (process.env.PORT || 3000));

var articles = [
    {
        name: 'My Article',
        author: 'Jim Jones'
    },
    {
        name: 'Your Article',
        author: 'Tim Jones'
    }
];

function getArticles() {
    return articles;
}

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));

app.get('/articles', function(request, response) { 
    var articleCollection = getArticles();
    response.json(articleCollection);
});

app.post('/articles', parseUrlencoded, function(request, response) {
    var newArticle = request.body;
    articles.push(newArticle);
    response.status(201).json(newArticle);
});

app.use('/', express.static(__dirname + '/dist'));
app.use('/scripts', express.static(__dirname + '/node_modules'));

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


