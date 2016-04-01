$(function(){
	//Returns the max value of the list
	function max(input) {
		input.sort();
		var max = input[input.length - 1];
		return max;
	};
	//Returns the average of the numbers in the dataset
	function average(input) {
		var len = input.length;
		var sum = 0;
		input.forEach(function(val) {
			sum += val;
		})
		var avg = sum / len;
		return avg;
	};
	//returns the mode of the list
	function mode(input) {
		var bucket = new Array();
		
		input.forEach(function(val) {
			if (bucket[val] === undefined) {
				bucket[val] = 1;
			}
			else {
				bucket[val]++;
			}
		})
		
		return bucket.indexOf(max(bucket));
	}
	//Returns the median of the list
	function median(input) {
		input.sort();
		var len = input.length;
		if (len % 2 === 0) {
			return (input[len/2] + input[(len/2) + 1]);
		}
		else {
			return input[(len + 1) / 2];
		}
	};
});