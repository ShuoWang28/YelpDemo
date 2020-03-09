var express = require("express");
var methodOverride = require("method-override");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var expressSanitizer = require("express-sanitizer");

mongoose.connect("mongodb://localhost:27017/restful_blog_app", { useNewUrlParser: true, useUnifiedTopology: true });
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(methodOverride("_method"));
app.use(expressSanitizer);

//Schema Set up
var blogSchema = new mongoose.Schema({
	title: String,
	author: String,
	image: String,
	content: String,
	created: {type: Date, default: Date.now}
});

var Blog = mongoose.model("Blog", blogSchema);


//RESTFUL ROUTES
//main page
app.get("/", function(req, res){
	res.redirect("/blogs");
});

//Index
app.get("/blogs", function(req, res){
	Blog.find({}, function(err, allBlogs) {
		if (err) {
			console.log(err);
		} else {
			res.render("blogs", {blogs: allBlogs});
		}
	})
});

//NEW ROUTE
app.get("/blogs/new", function(req, res){
	res.render("new");
});

//CREATE
app.post("/blogs", function(req, res) {
	Blog.create(req.body.blog, function(err, newlyAdded){
		if (err) {
			console.log(err);
		} else {
			res.redirect("/blogs");
		}
	})
});

//UPDATE ROUTE
app.get("/blogs/:id", function(req, res){
	Blog.findById(req.params.id, function(err, foundBlog){
		if (err){
			res.redirect("/blogs");
		} else {
			res.render("show", {blog: foundBlog});
		}
	})
});

//EDIT ROUTE
app.get("/blogs/:id/edit", function(req,res){
	Blog.findById(req.params.id, function(err, foundBlog){
		if (err) {
			res.redirect("/blogs");
		} else {
			res.render("edit", {blog: foundBlog});
		}
	})
});

//UPDATE ROUTE
app.put("/blogs/:id", function(req, res){
	Blog.findByIdAndUpdate(req.params.id, req.body.blog, function(err, updatedBlog){
		if(err) {
			res.redirect("/blogs");
		} else {
			res.redirect("/blogs/" + req.params.id);
		}
	})
});

//DELETE ROUTE
app.delete("/blogs/:id", function(req, res){
	Blog.findByIdAndRemove(req.params.id, function(err){
		if(err) {
			res.redirect("/blogs");
		} else {
			res.redirect("/blogs");
		}
	})
});

app.listen(3000, function() { 
  console.log('Yelp Camp Server listening on port 3000'); 
});