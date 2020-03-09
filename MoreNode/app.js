var express = require("express");
var app = express();
var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static("public"));
app.set("view engine", "ejs");

var posts = [
		{title: "1", author: "me"},
		{title: "2", author: "mee"},
		{title: "3", author: "m1e"}
	]

app.get("/", function(req, res) {
	res.render("home.ejs");
});

app.get("/fallinlovewith/:thing", function(req, res) {
	var thing = req.params.thing;
	res.render("love.ejs", {thingVar: thing});
})

app.get("/posts", function(req, res){
	
	res.render("posts.ejs", {posts: posts});
})

app.post("/createPost", function(req, res){
	console.log(req.body);
	var newPost = {title: req.body.title, author: req.body.author};
	posts.push(newPost);
	res.redirect("/posts");
});

app.listen(3000, function() { 
  console.log('Server listening on port 3000'); 
});