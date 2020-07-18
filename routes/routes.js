const db = require("../models");

module.exports = (app) => {

    // Express GET route that directs the user to index.
    app.get("/", (req, res) => {
        res.render("index");
    });

    // Express GET route that directs the user to main post board.
    app.get("/board", (req, res) => {
        res.render("board");
    });

    // Express GET route that directs the user to post form page.
    app.get("/post", (req, res) => {
        res.render("post");
    });

    // Express GET route that directs the user to their personal post board.
    app.get("/myboard", (req, res) => {
        res.render("myboard");
    });


  

};
