const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');

router.route('/register')
    .post((req, res, next) => {
        if (!req.body.username || !req.body.password) {
            res.sendStatus(400);
        }
        bcrypt.hash(req.body.password, 10, async (err, hash) => {
            if (err) {
                return next(err);
            }
            try {
                const result = await global.users.insertOne({ username: req.body.username, password: hash });
                console.log(result)
                if (!result.insertedId) {
                    console.log('something went wrong');
                    return next(new Error('oops, couldn\'nt insert post'));
                }
            }
            catch (err) {
                if (err.code === 11000) {
                    return next(new Error('username is taken.'));
                }
            }
            const err2 = new Error('username is taken');
            err2.statusCode = 201;
            return next(err);
        })
    });

router.route('/login')
    .post(async (req, res, next) => {
        const result = await global.users.findOne({ "username": req.body.username })
        if (result) {
            const result2 = await bcrypt.compare(req.body.password, result.password);        
            if (result2) {
                // sets up session with username
                req.session.username = req.body.username;
                return res.sendStatus(200);
            }
        }
        const err = new Error('invalid username or password');
        err.statusCode = 401;
        return next(err);
       
    });
router.route('/logout')
    .post((req, res, next) => {
        req.session.destroy();
        res.sendStatus(201)
    })

module.exports = router;

