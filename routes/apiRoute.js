const db = require("../models");
const e = require("express");

module.exports = (app) => {

    // Will send all user posts to the frontend
    app.get("/api/posts", (req, res) => {

        db.cb_User.findAll().then(allPosts => {
            console.log("Posts sent!");
            res.json(allPosts);
        });
    });

    // Will send all instruments available to frontend
    app.get("/api/instruments", (req, res) => {

        db.cb_Instrument.findAll().then(allInstruments => {
            console.log("instruments sent!");
            res.json(allInstruments);
        });
    });

    // Will send all criteria options available to frontend
    app.get("/api/criteria", (req, res) => {

        db.cb_Criteria.findAll().then(allCriteria => {
            console.log("Criteria options sent!");
            res.json(allCriteria);
        });
    });

    // Will Save user and return newly inserted user to frontend
    app.post("/api/user", (req, res) => {

        const newUser = {
            userName: req.body.userName,
            userEmail: req.body.userEmail,
            userNumber: req.body.userNumber,
            postTitle: req.body.postTitle,
            postBody: req.body.postBody,
            // fk_criteria: req.body.criteria,
            // fk_instrument: req.body.instrument,
            // fk_user: req.body.id

        };

        db.cb_User.create(newUser).then((dbUser) => {
            res.json(dbUser);

        });
    });


    app.post("/api/post", (req, res) => {

        let newUser = {
            userName: req.body.userName,
            userEmail: req.body.userEmail,
            userNumber: req.body.userNumber
        }
        let newPost = {
            postTitle: req.body.postTitle,
            postBody: req.body.postBody,
            // fk_user: -1
            // fk_criteria: req.body.criteria,
            // fk_instrument: req.body.instrument,
        };

        let userIdPlaceholder;
        let newUserId;
        // Find ID in database
        db.cb_User.findOne({ where: { userEmail: req.body.userEmail } }).then(user => {
            if (!user) {

                // Create New User
                db.cb_User.create(newUser).then((dbUser) => {
                    newUserId = dbUser.dataValues.id
                    console.log(newUserId);
                });

                db.cb_Post.create({
                    postTitle: req.body.postTitle,
                    postBody: req.body.postBody,
                    fk_user: newUserId
                }).then((dbPost) => {
                    res.json(dbPost);
                });


            } else {
                userIdPlaceholder = user.dataValues.id;
                // CALL UPDATE
                db.cb_Post.create({
                    postTitle: req.body.postTitle,
                    postBody: req.body.postBody,
                    fk_user: userIdPlaceholder
                }).then((dbPost) => {
                    res.json(dbPost);
                });
            }
        });

        // db.cb_Post.create({
        //     userName: req.body.userName,
        //     userEmail: req.body.userEmail,
        //     userNumber: req.body.userNumber,
        //     postTitle: req.body.postTitle,
        //     postBody: req.body.postBody,
        //     fk_user: userIdPlaceholder
        // }).then((dbPost) => {
        //     res.json(dbPost);
        // });
    });

    // app.get("/api/posts/:user", (req, res) => {
    //     const query = req.params.user;
    //     db.cb_User.findAll({
    //         where: query
    //     }).then((posts) => {
    //         res.json(posts);
    //     });
    // });
};