const express = require('express');
const sessionMiddleware = require('../sessionMiddleware');
const router = express.Router();

module.exports = function () {
    router.route('/')
        .get(async (req, res, next) => {
            const thePosts = await global.posts.find().toArray();
            res.send(thePosts);
        })
        .post(sessionMiddleware, async (req, res, next) => {
            req.body.author = req.session.username;
            req.body.date = new Date();
            const result = await global.posts.insertOne(req.body);

            if (!result.insertedId) {
                console.log('something went wrong');
                return next(new Error('oops, couldn\'nt insert post'));
            }

            req.body.id = result.insertedId;

            global.socketIo.emit('post', req.body);

            res.status(201).send(req.body);
        })
    return router;

};



