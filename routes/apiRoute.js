const db = require("../models");

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
    app.post("/api/post", (req, res) => {

        db.cb_User.create(req.body).then((dbUser) => {
            res.json(dbUser);
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