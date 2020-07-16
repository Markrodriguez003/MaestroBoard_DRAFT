
const express = require("express");
const handlebars = require("express-handlebars");
const app = express();
const path = require("path");
const bodyParser = require("body-parser"); // Importing node body-parser to parse JSON

const PORT = process.env.PORT || 8080;

// Loads middleware to parse JSON and grab json from POST bodies
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.set("view engine", "handlebars");

app.engine("handlebars", handlebars({
    extname: "handlebars",
   layoutsDir: path.join(__dirname + '/views/layouts')
}));


app.use(express.static(path.join (__dirname, "/public")));

// Grabs our DB and its models
const db = require("./models");

// This will handle GET requests
require("./routes/routes.js")(app);

// This will handle POST requests
require("./routes/apiRoute.js")(app);

// Create a port listener to make our app/page work with port but not before we load in DB
// { force: true }
db.sequelize.sync().then((err) => {
    // Array of criteria options   
    const criteriaOps = [
        { criteria: "Selling-Instrument" },
        { criteria: "Buying-Instrument" }
        // { postCriteria: "Looking-For-BandMates" },
        // { postCriteria: "Looking-For-Gigs" },
        // { postCriteria: "Posting-Gigs" },
    ];

    // Loads Criteria table with array of criteria option objects
    db.cb_Criteria.bulkCreate(criteriaOps, { validate: true }).then(() => {
        console.log("Criteria loaded");
    }).catch((err) => {
        console.log("Failed to load Criteria");
        console.log(err);
    });


    // instrument array of objects to load instrument table
    const instr = [
        { instrument: "Guitar" },
        { instrument: "Bass" },
        { instrument: "Drums" },
        { instrument: "Percussion" },
        { instrument: "Brass" },
        { instrument: "Woodwind" },
        { instrument: "Synthesizer" },
        { instrument: "Studio-Equipment" }
    ];

    // Loads instrument table with array of criteria option objects
    db.cb_Instrument.bulkCreate(instr, { validate: true }).then(() => {
        console.log("Instrument loaded");
    }).catch((err) => {
        console.log("Failed to load instruments");
        console.log(err);
    }).finally(console.log("..."));

    // Setup server listener to port AFTER db tables is fully loaded
    app.listen(PORT, function () {
        console.log("App listening on PORT " + PORT);
    });

});