//#region Homework 4
/*  2. 
	Use While loop to create a function called 'triangleStars' 
	that prints an upside-down triangle to the console of the given height.  
	So if we call your function with triangleStars(4), we should see:

	*******
	 *****
	  ***
	   *

*/
const triangleStars = (height) => // Anonymous function expressed thru a lambda expression
{
	//Checking for bad input
	if(height === null || height === undefined || isNaN(height)){console.log("Bad input ¯\_(ツ)_/¯"); return;}
	else if(height === 0){return;}
	
	//Mathematical relationship = 1 + 2(n - 1) for n belngs to Z, n !== 0.
	//Number of spaces = height - currentLine;
	if(height > 0) // If we want the triangle to be upside down
	{
		let currentLine = height - 1; 
		while(currentLine > -1) //Iterate from current line down to 0
		{
			let currStr = ""; //Running String
			let struts = height - currentLine; // Number of struts to put before the asterisks to allign the triangle
			let asteriks = 1 + (2 * (currentLine)); // Number of asteriks in this line
			
			let j = 0; // Local variable for loops
			let k = 1; // Local variable for loops
			
			while(j < struts) // For every strut needed
			{
				currStr += "-"; // Add a strut 
				j++; // Accounts for iteration by incrementing j by 1
			};
			
			while(k <= asteriks) // For every star needed
			{
				currStr += "*"; // Add a star
				k++; // Accounts for iteration by incrementing k by 1
			};

			if(currStr == undefined || currStr == null || currStr == ""){} // Checks if the row is ready
			else {console.log(currStr);} // Prints the row
			currentLine--; // Moves down a row
		}
	};
	
	if(height < 0) // If we want the triangle to be like a pyramid
	{
		let currentLine = 0; // Start from 0
		while(currentLine > height) // Iterate from 0 to height
		{
			let currStr = ""; //Running String that we will fill in and output
			let struts = (height - (3 * height)) - ((height - 2*height) - currentLine); // Number of struts to put before the asterisks to allign the triangle
			let asteriks = 1 - (2 * (currentLine)); //Number of asteriks in this line
			
			let j = 1; //Local variable for loops
			let k = 1; //Local variable for loops
			
			while(j < struts) // For every strut needed
			{
				currStr += "-"; // Add a strut 
				j++; // Accounts for iteration by incrementing j by 1
			};
			
			while(k <= asteriks) // For every star needed
			{
				currStr += "*"; // Add a star
				k++; // Accounts for iteration by incrementing k by 1
			};

			if(currStr == undefined || currStr == null || currStr == ""){} // Do nothing if somehow the running string is not there
			else {console.log(currStr);} // Print the row
			currentLine--; // Move down one row
		}
	};
};

// 3. Write a function that takes a two dimensional array and returns a single array with all the values in the child arrays.
const combiner = (arg) => // Anonymous function expressed thru a lambda expression
{
	if(!Array.isArray(arg)){return null} // Check if the input is an array
	else if(arg[0] == undefined || arg[0] == null || arg == null || arg == undefined || arg[1] == null || arg[1] == undefined){return null} // Check if the input is null or it's children are nulls
	else if(!Array.isArray(arg[0]) || !Array.isArray(arg[1])){return null} // Check if the children are arrays
	else {return arg[0].concat(arg[1]);}; // Merge the arrays
};

// 4. Create a function 'findMinMax' that returns the largest number from the given array if the second argument is true.  It returns the smallest number in the given array if the second argument is false.
const findMinMax = (array, biggest) => // Anonymous function expressed thru a lambda expression
{
	if(!Array.isArray(array)){return null} // Check if the input is an array
	else if(!(biggest === true || biggest === false)){return null} // Checks if the second argument is a boolean && !null
	else if(biggest){ return Math.max.apply(null, array)} // Choose the biggest number
	else if(!biggest){ return Math.min.apply(null, array)}; // Choose the smallest number
};

//5. Create a function 'forEach' that takes an array and a function and then calls the given function once with each value in the given array.
const forEach = function (array, func) 
{
    let juice = 0; // Variable used to account for the number of passes by the while loop
	while (juice < array.length)
	{
        func(array[juice]); // Call the given function, passing in each element of the given array one by one
        juice++; // Increment juice by 1, thus accounting for a loop
    }
}


// 6. Create a function 'sum' that takes an array of numbers and returns their sum.
const SumUp = (array) => // Anonymous function expressed thru a lambda expression
{
	//Check for bad input
	if(!Array.isArray(array) || array == null || array == undefined){return null;};

	let runningSum = 0; // This will be filled in and exported
	let lngth = 0; // Used in the loop to count iterations, gets to array.length
	while(lngth < array.length)
	{
		runningSum += array[lngth]; // Add the current element to the sum of all the previous elements
		lngth++; // Account the iteration by incrememnting "lngth"
	};
	return runningSum; // Output the sum of all the elements in the array
}

// 7. Write a function 'reverse' that reverses the given string.  
const reverse = (str) => // Anonymous function expressed thru a lambda expression
{
	let runningStr = ""; // This will soon be the output
	let loopEnergy = 0; // Used in the while loop, gets to the length of the given string
	while(loopEnergy < str.length)
	{
		runningStr += str[str.length - loopEnergy - 1]; // Concats the input character by character to "runningStr" starting from the last character
		loopEnergy++; // Increasing the "loopEnergy" by 1
	}
    return runningStr; // Outputs the reversed string
};

// 8. Create a function called checkerboard using While loop which, given a size argument, will draw an n by n checkerboard on the screen. 
const checkerBoard = (n) => // Anonymous function expressed thru a lambda expression
{
	const checkerBlack = "⬛"; 
	const checkerWhite = "⬜";
	let row = ""; // This will be filled in via the first while loop


	let loopEnergy = 0; // Used in the first while loop, gets to n
	while(loopEnergy < n) // Runs n times
	{
		row += checkerBlack + checkerWhite; // Adds two checkers to the row
		loopEnergy++; // Increasing the "loopEnergy" by 1
	};

	
	let loopFlux = 0; // Used in the second while loop to represent the running row number
	while(loopFlux < n) // Runs for every row (should be 2*n but ill do n to match the moodle)
	{
		if(loopFlux % 2){console.log(reverse(row))} // Log the reverse of the row if the current row number is odd (starts from 0)
		else{console.log(row)} // Log the row if the current row number is even (starts from 0)
		loopFlux += 1; //Increment loopFlux by 1
	}
};

//#endregion