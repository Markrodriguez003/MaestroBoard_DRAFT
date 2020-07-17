const db = require("../models");
const e = require("express");

module.exports = (app) => {

    // Will send all user Users to the frontend
    app.get("/api/users", (req, res) => {

        db.cb_User.findAll().then(allUsers => { // Will send ALL Users  
            console.log("Posts sent!");
            res.json(allUsers);
        });
    });


    // Will send all user Posts to the frontend
    app.get("/api/posts", (req, res) => {

        db.cb_Post.findAll().then(allPosts => { // Will send ALL Posts  
            console.log("Posts sent!");
            res.json(allPosts);
        });
    });

    // Will send all user Posts with JOINED users to the frontend // ! ERROR NOT WORKING ATM

    app.get("/api/userPposts", (req, res) => {

        db.cb_User.findAll({ include: [db.cb_Post] }).then(usersPosts => {

            usersPosts.forEach(userPost => {
                console.log(`${userPost.userName} is in project ${userPost.cb_post.fk_user}`);
            });
        });
    });


    // Will send all instruments available to frontend
    app.get("/api/instruments", (req, res) => {

        db.cb_Instrument.findAll().then(allInstruments => { // Will send all instruments from instrument table
            console.log("instruments sent!");
            res.json(allInstruments);
        });
    });

    // Will send all criteria options available to frontend
    app.get("/api/criteria", (req, res) => {

        db.cb_Criteria.findAll().then(allCriteria => {  // Will send all criteria options from criteria table
            console.log("Criteria options sent!");
            res.json(allCriteria);
        });
    });

    // Will Save user to database and return newly inserted user to frontend *DEVELOPMENT ONLY AS IT IS ONLY TO INSERT USERS
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


    // Will save new post + user (if user is new) to database and return json object of newly created object
    app.post("/api/post", (req, res) => {

        let newUser = { // Object that will hold the user's info to be inserted into the user table
            userName: req.body.userName,
            userEmail: req.body.userEmail,
            userNumber: req.body.userNumber
        }
        let newPost = { // Object that will hold the user's post data to be inserted into the post table
            postTitle: req.body.postTitle,
            postBody: req.body.postBody,
            // fk_user: -1
            // fk_criteria: req.body.criteria,
            // fk_instrument: req.body.instrument,
        };

        let userIdPlaceholder;
        let newUserId;
        let newUserEmail;


        // Find ID in database to check to see if user already exists in user table
        db.cb_User.findOne({ where: { userEmail: req.body.userEmail } }).then(user => {
            if (!user) { // if user is not in table then . . .

                // Create New User and push it to user table then . . .
                db.cb_User.create(newUser).then((dbUser) => {
                    newUserId = dbUser.dataValues.id // ! THE ID ISNT BEING GENERATED HERE QUITE YET HENCE THE NULL VALUE
                    // ? Do another findall() in here to grab newly created user ID?
                    newUserEmail = req.body.userEmail;
                    console.log(newUserId);

                    // Push the newly created user's post into database as well while matching FK id's for both    
                    db.cb_Post.create({
                        postTitle: req.body.postTitle,
                        postBody: req.body.postBody,
                        fk_user: newUserId
                    }).then((dbPost) => {
                        res.json(dbPost); // Spits out newly created user and their post to frontend
                    });
                });



            } else { // If user is already in table then . . . 

                // Grab user's ID from user table
                userIdPlaceholder = user.dataValues.id;

                // Creates new post for user while attaching/matching it's user table ID to post table as a Foreign key
                db.cb_Post.create({
                    postTitle: req.body.postTitle,
                    postBody: req.body.postBody,
                    fk_user: userIdPlaceholder
                }).then((dbPost) => {
                    res.json(dbPost); // jnsjdgnsjdng Spits out newly created post to frontend
                });
            }
        });
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





