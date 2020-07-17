const db = require("../models");
const e = require("express");

module.exports = (app) => {

    // ************************************************************************************************************** //
    // ********************************************* POST Route Requests ******************************************** //
    // ************************************************************************************************************** //

    // Will Save user to database and return newly inserted user to frontend *DEVELOPMENT ONLY AS IT IS ONLY TO INSERT USERS
    app.post("/api/user", (req, res) => {

        const newUser = {
            userName: req.body.userName,
            userEmail: req.body.userEmail,
            userNumber: req.body.userNumber,
        };

        db.cb_User.create(newUser).then((dbUser) => {res.json(dbUser);});
    });

    // Will save new post + user (if user is new) to database and return json object of newly created object
    app.post("/api/post", (req, res) => {

        let newUser = { // Object that will hold the user's info to be inserted into the user table
            userName: req.body.userName,
            userEmail: req.body.userEmail,
            userNumber: req.body.userNumber
        };

        let newPost = { // Object that will hold the user's post data to be inserted into the post table
            postTitle: req.body.postTitle,
            postBody: req.body.postBody,
            fk_criteria: req.body.criteria,
            fk_instrument: req.body.instrument
        };

        let userIdPlaceholder;
        let newUserId;
        let newUserEmail;

        // Find ID in database to check to see if user already exists in user table
        db.cb_User.findOne({ where: { userEmail: newUser.userEmail } }).then(user => {
            if (!user) { // if user is not in table then . . .

                // Create New User and push it to user table then . . .
                db.cb_User.create(newUser).then((dbUser) => {
                    newUserId = dbUser.dataValues.id
                    newUserEmail = newPost.postBody;

                    // Push the newly created user's post into database as well while matching FK id's for both    
                    db.cb_Post.create({
                        postTitle: newPost.postTitle,
                        postBody: newPost.postBody,
                        fk_user: newUserId,
                        fk_criteria: newPost.fk_criteria,
                        fk_instrument: newPost.fk_instrument

                    }).then((dbPost) => {res.json(dbPost);}); // Spits out newly created user and their post to frontend
                });

            } else { // If user is already in table then . . . 

                // Grab user's ID from user table
                userIdPlaceholder = user.dataValues.id;

                // Creates new post for user while attaching/matching it's user table ID to post table as a Foreign key
                db.cb_Post.create({
                    postTitle: newPost.postTitle,
                    postBody: newPost.postBody,
                    fk_user: userIdPlaceholder,
                    fk_criteria: newPost.fk_criteria,
                    fk_instrument: newPost.fk_instrument
                }).then((dbPost) => {
                    res.json(dbPost); // Spits out newly created post to frontend
                });
            }
        });
    });
}