// The number of permutations of n objects taken r at a time
// is determined by P(n, r) = n! / (n - r)!
// In this case, p = 24. 
// P(4, 4) = 4! / (4 - 4)!
// P(4, 4) = (4*3*2*1)/0!
// P(4, 4) = 24/1 
// P(4, 4) = 24

$listofsolutions = $("#listofsolutions");
$solutiontitle = $("#solutiontitle");
$togglesol = $("#togglesol");
$numone = $("#numone");
$numtwo = $("#numtwo");
$numthree = $("#numthree");
$numfour = $("#numfour");
var op_keys = ['+', '-', '*', '/'];

function solExists() {
	if ($listofsolutions.has('li').length) {
		$solutiontitle.html("Solutions <span id='exist'>solutions exist</span>");
		$listofsolutions.hide();
	} else {
		$solutiontitle.html("Solutions <span id='notexist'>no solutions exist</span>");
	}
}//solexists

$togglesol.click(function() {
	$listofsolutions.fadeToggle();

	// dear future self: find out how this works...
	// specifically the text function
	$(this).text(function(i, text) {
		return text === "Show" ? "Hide" : "Show";
	})
});


function calc() {

	// functions to use

	// swaps variables
	var swap = function(arr, p1, p2) {
		var temp = arr[p1];
		arr[p1] = arr[p2];
		arr[p2] = temp;
	}; // swap

	// all possible combinations of an array
	// using heaps permutation algorithm
	var heapsPermute = function(arr, n) {
		n = n || arr.length;
		if (n == 1) {
			operate(arr);
		} else {
			for (var i = 1; i <= n; i++) {
				heapsPermute(arr, n - 1);
				if (n % 2) {
					var j = 1;
				} else {
					var j = i;
				}// else
				swap(arr, j - 1, n - 1);
			}
		}
	}; // heapsPermute 

	// here is the action
	$listofsolutions.html("");

	var num1 = parseInt(document.getElementById("num1").value);
	var num2 = parseInt(document.getElementById("num2").value);
	var num3 = parseInt(document.getElementById("num3").value);
	var num4 = parseInt(document.getElementById("num4").value);
	var nums = [num1, num2, num3, num4];

	$togglesol.html("Show");

	$numone.html(num1);
	$numtwo.html(num2);
	$numthree.html(num3);
	$numfour.html(num4);

	const OPS = {
		'+': (num1, num2) => num1 + num2,
		'-': (num1, num2) => num1 - num2,
		'*': (num1, num2) => num1 * num2,
		'/': (num1, num2) => Math.floor(num1 / num2),
	}// OPS

	// dear future self: please do better than this next time you work on it :(
	// currently running at O(n^3)...
	// this function does all possible operation combinations on 4 numbers
	function operate(nums) {
		var num1 = nums[0];
		var num2 = nums[1];
		var num3 = nums[2];
		var num4 = nums[3];

		for(var i=0; i < op_keys.length; i++) {
			for(var j=0; j < op_keys.length; j++) {
				for(var k=0; k < op_keys.length; k++) {
					var operation = "(" + "(" + num1 + op_keys[i] + num2 + ")" + op_keys[j] + num3 + ")" + op_keys[k] + num4;
					var result = OPS[op_keys[i]](num1, num2);
					var result2 = OPS[op_keys[j]](result, num3);
					var result3 = OPS[op_keys[k]](result2, num4);
					var display = operation + " = " + result3;

					if (result3 === 24) { 
						$listofsolutions.append("<li class='sol'>" + display + "</li>"); 
					}

				}// k
			}// j
		}// i

	}// operate

	heapsPermute(nums);
	solExists();

}// calc