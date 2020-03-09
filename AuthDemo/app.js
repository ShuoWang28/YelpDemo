var express = require("express");
var mongoose = require("mongoose");
var passport = require("passport");
var bodyParser = require("body-parser");
var LocalStrategy = require("passport-local");
var passportLocalMongoose = require("passport-local-mongoose");
var User = require("./models/user");

mongoose.connect("mongodb://localhost:27017/secret", { useNewUrlParser: true, useUnifiedTopology: true });



var app = express();
app.set("view engine", 'ejs');
app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.urlencoded({extended: true}));

app.use(require("express-session")({
	secret: "Getting me a Job!!!",
	resave: false,
	saveUninitialized: false
}));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
passport.use(new LocalStrategy(User.authenticate()));

//=============
//ROUTE
//=============


app.get("/", function(req, res){
	res.render("home");
});

app.get("/secret",isLoggedIn, function(req, res){
	res.render("secret");
})


//Auth route
app.get("/register", function(req, res){
	res.render("register");
})

app.post("/register", function(req, res){
	req.body.username
	req.body.password
	User.register(new User({username: req.body.username}), req.body.password, function(err, user){
		if(err) {
			console.log(err);
			return res.render('register');
		}
		passport.authenticate("local")(req, res, function(){
			res.redirect("/secret");
		})
	});
});


//LOGIN ROUTE
app.get("/login", function(req, res){
	res.render("login");
});

app.post("/login",passport.authenticate("local",{
	successRedirect: "/secret",
	failureRedirect: "/register"
}), function(req, res){
});

app.get("/logout", function(req, res){
	req.logout();
	res.redirect("/");
});

function isLoggedIn(req, res, next) {
	if (req.isAuthenticated()){
		return next();
	}
	res.redirect("/login");
};

app.listen(3000, function() { 
  console.log('Server listening on port 3000'); 
});

