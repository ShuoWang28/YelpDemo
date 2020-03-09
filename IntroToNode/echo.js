function echo(str, num) {
	for (var i = 0; i < num; i++) {
		console.log(str);
	}
}

function average(nums) {
	let sum = 0;
	nums.forEclearach(function(element) {
		sum += element;
	}) 
	return sum / nums.length;
}

var scores = [90, 80,70,70];
console.log(Math.round(average(scores)));