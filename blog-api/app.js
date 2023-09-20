const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);

const blogCLientURL = 'http://localhost:3000';

// connect to socket io
const io = require('socket.io');
global.socketIo = io(server, {
    cors: blogCLientURL
});

// MongoDB
const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb://127.0.0.1:27017";
const client = new MongoClient(uri);

// session
const session = require('express-session');

// view engine setup
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// session middleware
app.use(session({
    secret: 'sessionCode',
    resave: false,
    saveUninitialized: false,
}))

// enable cors specifically for blog client
app.use(
    require('cors')({ origin: blogCLientURL, credentials: true })
);


(async () => {
    await client.connect();
    global.posts = await client.db('blog').collection('posts');
    global.users = await client.db('blog').collection('users');

})();

app.use('/posts', require('./routes/posts.js')());
app.use('/comments', require('./routes/comments.js')());
app.use('/', require('./routes/authentication.js'));


app.get('/', (req, res, next) => {
    res.status(201)
        // .location(...)
        .send(req.body);
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    const error = new Error('No such page');
    error.statusCode = 404;
    next(error);
});

// error handler
app.use(function (err, req, res, next) {
    // render the error page
    res.status(err.status || 500)
        .send(err.message)
});
server.listen(8080);



module.exports = app;
