//#region Homework 3


/* A function that takes at least three arguments and returns the result of some set of operations using those arguments - 5 points */
const beep = function(arg0, arg1, arg2){ return arg1 + (arg2 + arg0)};



/* A function that takes no arguments and returns something - 5 points */
const pi = () => {return 3.14159265358979323846264338327950288;};



/* A function that takes arguments, does something but does not return anything - 6 points */
const System = {Console: {WriteLine: function(arg){console.log(arg);}}};
System.Console.WriteLine("hehe this works now, hurray c# users!");


/* A function that takes three strings and returns the string that is the longest. - 6 points */
const longlegs = function(str0, str1, str2)
{
	// Store the lengths of the strings
	const card1 = str1.toString().length;
	const card0 = str0.toString().length;
	const card2 = str2.toString().length;
	
	// Compare the strings
	if(card0 > card1 && card0 > card2){return card0;}
	else if(card1 > card0 && card1 > card2){return card1;}
	else if(card2 > card0 && card2 > card1){return card2;}
	else 
	{
		System.Console.WriteLine("These arguments cannot compete!");
		return "These arguments cannot compete!";4
	};
};



/* A function that takes two numbers and returns 0 if they are equal, 1 if 1st > 2nd and -1 if 1st < 2nd  - 6 points */
const compareNum = function(num1, num2)
{
   if(num1 === undefined || num2 === undefined || num1 === null || num2 === null){return null;}
   else if(num1 < num2){return -1;}
   else if(num1 > num2){return 1;}
	else if(num1 === num2){return 0;}
	else {return null;};
};



/* Create a multiply function - 2 points */
const mult = function(num1, num2)
{ 
	if(num1 === undefined || num2 === undefined || num1 === null || num2 === null){return null;};
	return (num1 * num2);
	
};

/* Create a divide function - 2 points */
const div = function(num1, num2)
{ 
	if(num1 === undefined || num2 === undefined || num1 === null || num2 === null || num2 == 0 /*The == is on purpose*/ ){return null;};
	return (num1 / num2);
	
};

/* Create a function that calculates the area of a triangle without using * or / - 6 points */
const triangleArea = function(base, height){ return div(mult(base, height), 2);};

/* Create a function that returns the number of digits - 6 points */
const numLength = function(num){ return num.toString().length;};

/* Create a function that takes two strings and one number, if the (concat of the strings).length > num return 1 else -1 and 0 for === - 6 points */
const sizer = function(str0, str1, num)
{ 
	if (num === undefined || num === null){return null;}
	else if ((str0 + str1).length > num){return 1;}
	else if ((str0 + str1).length < num){return -1;}
	else if ((str0 + str1).length === num){return 0;}
	else 
	{
		System.Console.WriteLine("Bad input");
		return null;
	};
};


/* Create a function that takes two strings and one number, if the (concat of the strings).length > num return 1 else -1 and 0 for === - 6 points */
const runStuff = function(num0, num1, str)
{
	if (str === "rectangle"){return (num0 * num1);}
	else if (str === "triangle"){return ((num0 * num1)/2);}
	else {return null;};
};


//#endregion