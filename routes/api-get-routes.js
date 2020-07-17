const db = require("../models");
const e = require("express");

module.exports = (app) => {

    // ************************************************************************************************************** //
    // ********************************************* GET Route Requests ********************************************* //
    // ************************************************************************************************************** //

    // Will send all instruments available 
    app.get("/api/instruments", (req, res) => {

        db.cb_Instrument.findAll().then(allInstruments => { // Will send all instruments from instrument table
            console.log("instruments sent!");
            res.json(allInstruments);
        });
    });

    // Will send all criteria options available
    app.get("/api/criteria", (req, res) => {

        db.cb_Criteria.findAll().then(allCriteria => {  // Will send all criteria options from criteria table
            console.log("Criteria options sent!");
            res.json(allCriteria);
        });
    });
    // Will send all Users to the frontend
    app.get("/api/users", (req, res) => {

        db.cb_User.findAll().then(allUsers => { // Will send ALL Users  
            console.log("Posts sent!");
            res.json(allUsers);
        });
    });


    // Will send all Posts to the frontend
    app.get("/api/posts", (req, res) => {

        db.cb_Post.findAll().then(allPosts => { // Will send ALL Posts  
            console.log("Posts sent!");
            res.json(allPosts);
        });
    });

    // Will send all user Posts with JOINED users to the frontend 
    app.get("/api/all", (req, res) => {

        db.cb_User.findAll({
            include: [db.cb_Post],
            raw: true
        })
            .then(usersPosts => {
                console.log("ALL POSTS ---> ", usersPosts);
                res.json(usersPosts);
            });
    });

    // Will send all queried (by user name) user Posts with JOINED users to the frontend 
    app.get("/api/all/username/:userName", (req, res) => {
        const query = req.params.userName;

        db.cb_User.findAll({

            include: [db.cb_Post],
            where: {
                userName: query
            },
            raw: true
        })
            .then(queryPosts => {
                console.log("REQUESTED QUERIED POSTS ---> ", queryPosts);
                res.json(queryPosts);
            });
    });


    // Will send all queried (by user email) user Posts with JOINED users to the frontend 
    app.get("/api/all/userEmail/:userEmail", (req, res) => {
        const query = req.params.userEmail;

        db.cb_User.findAll({

            include: [db.cb_Post],
            where: {
                userEmail: query
            },
            raw: true
        })
            .then(queryPosts => {
                console.log("REQUESTED QUERIED POSTS ---> ", queryPosts);
                res.json(queryPosts);
            });
    });

    // Will send all queried (by user number) user Posts with JOINED users to the frontend 
    app.get("/api/all/userNumber/:userNumber", (req, res) => {
        const query = req.params.userNumber;

        db.cb_User.findAll({

            include: [db.cb_Post],
            where: {
                userNumber: query
            },
            raw: true
        })
            .then(queryPosts => {
                console.log("REQUESTED QUERIED POSTS ---> ", queryPosts);
                res.json(queryPosts);
            });
    });
};





