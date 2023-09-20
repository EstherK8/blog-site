const express = require('express');
const sessionMiddleware = require('../sessionMiddleware');
const router = express.Router();
const Mongo = require('mongodb');

module.exports = function () {
    router.route('/')
        .post(sessionMiddleware, async (req, res, next) => {
            if (!req.body.commentID || !req.body.comment) {
                res.sendStatus(400);
            }
            const comment = {
                body: req.body.comment,
                author: req.session.username,
                date: new Date(),
                id: new Mongo.ObjectId()
            }

            const result = await global.posts.updateOne({ _id: new Mongo.ObjectId(`${req.body.commentID}`) }, { $push: { comments: comment } });

            console.log(result);
            if (!result.modifiedCount) {
                console.log('something went wrong');
                return next(new Error('oops, couldn\'nt insert comment'));
            }
            req.body.id = result.insertedId;

            global.socketIo.emit('comment', comment);

            res.status(201).send(req.body);
        })
    return router;

};



