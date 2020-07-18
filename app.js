
const express = require("express"); // Importing express module to handle our node routing
const handlebars = require("express-handlebars"); // Importing handlebars to use as our template system
const app = express(); // Initializing our express app
const path = require("path"); // Importing path node module 
const bodyParser = require("body-parser"); // Importing node body-parser to parse JSON

// Sets up the port for development (8080) and for running it on a server service like heroku (process.env.PORT)
const PORT = process.env.PORT || 8080;

// Loads middleware to parse JSON and grab json from POST bodies
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Sets up our template to handlebars
app.set("view engine", "handlebars");

// Initialized handlebars as our template engine and associating it to .handlebars files  
app.engine("handlebars", handlebars({
    extname: "handlebars",
    layoutsDir: path.join(__dirname + '/views/layouts')
}));

// Sets up the static folder that contains all of our static assets (the things that don't change -> images, sound files, our pages, ect)
app.use(express.static(path.join(__dirname, "public")));

// Grabs our DB and its models
const db = require("./models");

// This will handle static/basic GET requests
require("./routes/routes.js")(app);

// This will handle API GET requests
require("./routes/api-get-routes")(app);

// This will handle API POST requests
require("./routes/api-post-routes")(app);

// Create a port listener to make our app/page work with port but not before we load in DB
// { force: true }
db.sequelize.sync({ force: true }).then((err) => {
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
        { instrument: "guitar" },
        { instrument: "bass" },
        { instrument: "drums" },
        { instrument: "percussion" },
        { instrument: "brass" },
        { instrument: "woodwind" },
        { instrument: "synthesizer" },
        { instrument: "studio" },
        { instrument: "dj" }
    ];

    // Example Users object array
    const exampleUsers = [
        {
            userName: "Asmondo2",
            userEmail: "Asmondo2@gmail.com",
            userNumber: "123456789422",
        }, {
            userName: "jAMES333",
            userEmail: "JAMES22!@yahoo.com.com",
            userNumber: "7777777777",
        }, {
            userName: "markrodriguez003",
            userEmail: "markrodriguez0032@gmail.com",
            userNumber: "78978978888",
        }, {
            userName: "Ryann141",
            userEmail: "Ryann141@hotmail.com",
            userNumber: "1112223333",
        }, {
            userName: "n141brian",
            userEmail: "brybry@viewmail.com",
            userNumber: "0000000000",
        }
    ];

    // Example Posts object array
    const examplePosts = [

        {
            postTitle: "Looking for Fender Baxo!",
            postBody: "Buying a fender jazz bass, any year. Offering $888.88 CASH!",
            fk_criteria: 1,
            fk_instrument: 2,
            fk_user: 1
        },

        {
            postTitle: "Selling Ibanez hollowbody!",
            postBody: "Hey guys, selling a ibanez hollowbody, mint and kept in a smokefree studio. $425.00 CASH or CASHAPP Only!!!",
            fk_criteria: 2,
            fk_instrument: 1,
            fk_user: 2
        },

        {
            postTitle: "On the lookout for microphone preamps!",
            postBody: "Hey guys I am looking for studio grade microphone preamps. Anything from UAD will be considered!",
            fk_criteria: 1,
            fk_instrument:8,
            fk_user: 3
        },
        {
            postTitle: "Selling studio desk!",
            postBody: "Selling studio grade desk with rack mounts. Cherry wood finish, almost mint. $550.00",
            fk_criteria: 2,
            fk_instrument: 8,
            fk_user: 4
        },
        {
            postTitle: "Looking for alto sax",
            postBody: "Looking for touring grade alto sax! Offering $777.88 CASH!",
            fk_criteria: 1,
            fk_instrument: 5,
            fk_user: 5
        }
    ];

    // Loads instrument table with array of criteria option objects
    db.cb_Instrument.bulkCreate(instr, { validate: true }).then(() => {
        console.log("Instrument loaded");
    }).catch((err) => {
        console.log("Failed to load instruments");
        console.log(err);
    }).finally(console.log("..."));

    // Loads Example Users (5) into User table
    db.cb_User.bulkCreate(exampleUsers, { validate: true }).then(() => {
        console.log("User loaded");
    }).catch((err) => {
        console.log("Failed to load User");
        console.log(err);
    }).finally(console.log("..."));

    // Loads Example Posts (5) into Posts table
    db.cb_Post.bulkCreate(examplePosts, { validate: true }).then(() => {
        console.log("Post loaded");
    }).catch((err) => {
        console.log("Failed to load Post");
        console.log(err);
    }).finally(console.log("..."));

    // Setup server listener to port AFTER db tables is fully loaded
    app.listen(PORT, function () {
        console.log("App listening on PORT " + PORT);
    });

});