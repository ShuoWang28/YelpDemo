var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/cat_app");

var catSchema = new mongoose.Schema({
	name: String,
	age: Number,
	temperament: String
});

var Cat = mongoose.model("Cat", catSchema);

//adding a new cat

// var george = new Cat({
// 	name: "Mrs. Norris",
// 	age: 7,
// 	temperament: "Evile"
// });

// george.save(function(err, cat){
// 	if(err) {
// 		console.log("SOMETHING WENT WRONG");
// 	} else {
// 		console.log("WE JUST SAVED A CAT TO THE DB:");
// 		console.log(cat);
// 	}
// });

Cat.create({
	name: "Snow white",
	age: 15,
	temperament: "Blend"
}, function(err, cat){
	if (err) {
		console.log(err);
	} else {
		console.log(cat);
	}
});

//retrieve all cats from the DB

Cat.find({}, function(err, cats){
	if(err) {
		console.log("OH NO, ERROR!");
		console.log(err);
	} else {
		console.log("ALL THE CATS......");
		console.log(cats);
	}
})