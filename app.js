
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


app.use(express.static(path.join(__dirname, "/public")));

// Grabs our DB and its models
const db = require("./models");

// This will handle GET requests
require("./routes/routes.js")(app);

// This will handle POST requests
require("./routes/apiRoute.js")(app);

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
        { instrument: "Guitar" },
        { instrument: "Bass" },
        { instrument: "Drums" },
        { instrument: "Percussion" },
        { instrument: "Brass" },
        { instrument: "Woodwind" },
        { instrument: "Synthesizer" },
        { instrument: "Studio-Equipment" }
    ];
    const exampleUsers = [
        {
            userName: "Asmondo2",
            userEmail: "Asmondo2@gmail.com",
            userNumber: "123456789422"
        },
        {
            userName: "jAMES333",
            userEmail: "JAMES22!@yahoo.com.com",
            userNumber: "7777777777"
        },
        {
            userName: "markrodriguez003",
            userEmail: "markrodriguez0032@gmail.com",
            userNumber: "78978978888",
        },
        {
            userName: "Ryann141",
            userEmail: "Ryann141@hotmail.com",
            userNumber: "1112223333",
        }
    ];
    const examplePosts = [

        // Asmondo2   id 1   fk_user 1
        {
            
            postTitle: "Looking for Fender Baxo!",
            postBody: "Buying a fender jazz bass, any year. Offering $888.88 CASH!",
            criteria: "1",
            instrument: "2"
        },

        // james id 2 fk_user 2
        {
            
            postTitle: "Selling Ibanez hollowbody!",
            postBody: "Hey guys, selling a ibanez hollowbody, mint and kept in a smokefree studio. $425.00 CASH or CASHAPP Only!!!",
            criteria: "2",
            instrument: "1"
        },

        // markrodriguez id 3 fk_user 3
        {
         
            postTitle: "On the lookout for microphone preamps!",
            postBody: "Hey guys I am looking for studio grade microphone preamps. Anything from UAD will be considered!",
            criteria: "1",
            instrument: "9"
        },
            // Ryan id 5 fk_user 5
        {
           
            postTitle: "Looking for alto sax",
            postBody: "Looking for touring grade alto sax! Offering $777.88 CASH!",
            criteria: "1",
            instrument: "7"
        }
    ];

    // Loads instrument table with array of criteria option objects
    db.cb_Instrument.bulkCreate(instr, { validate: true }).then(() => {
        console.log("Instrument loaded");
    }).catch((err) => {
        console.log("Failed to load instruments");
        console.log(err);
    }).finally(console.log("..."));

    db.cb_Post.bulkCreate(examplePosts, { validate: true }).then(() => {
        console.log("Post loaded");
    }).catch((err) => {
        console.log("Failed to load Post");
        console.log(err);
    }).finally(console.log("..."));

    db.cb_User.bulkCreate(exampleUsers, { validate: true }).then(() => {
        console.log("User loaded");
    }).catch((err) => {
        console.log("Failed to load User");
        console.log(err);
    }).finally(console.log("..."));

    // Setup server listener to port AFTER db tables is fully loaded
    app.listen(PORT, function () {
        console.log("App listening on PORT " + PORT);
    });

});