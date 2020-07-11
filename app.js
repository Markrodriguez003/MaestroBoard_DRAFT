// var express = require("express");


// var app = express();
// var PORT = process.env.PORT || 7000;


// var db = require("./model");


// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());


// app.use(express.static("public"));


// require("./routes/routes.js")(app);


// db.sequelize.sync({ force: true }).then(function() {
//   app.listen(PORT, function() {
//     console.log("App listening on PORT " + PORT);
//   });
// });


const express = require("express");
const handlebars = require("express-handlebars");
const app = express();
const path = require("path");
const port = process.env.PORT || 8080;


app.set("view engine", "handlebars");

app.engine("handlebars", handlebars({
    extname: "handlebars",
   layoutsDir: path.join(__dirname + '/views/layouts')
}));


app.use(express.static(path.join (__dirname, "public")));

app.get("/", (req,res)=>{
    res.render('index');
});
app.get("/post", (req,res)=>{
    res.render('post');
});
app.get("/board", (req,res)=>{
    res.render('board');
})

app.listen(port, () => console.log(`App listenining on port ${port}`));