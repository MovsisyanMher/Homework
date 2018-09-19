//#region Homework 3


/* A function that takes at least three arguments and returns the result of some set of operations using those arguments - 5 points */
const beep = function(arg0, arg1, arg2){ return arg1 + (arg2 + arg0)};



/* A function that takes no arguments and returns something - 5 points */
const pi = () => {return 3.14159265358979323846264338327950288;};



/* A function that takes arguments, does something but does not return anything - 6 points */
const System = {Console: {WriteLine: function(arg){console.log(arg);}}};
System.Console.WriteLine("hehe this works now, hurray c# users!");


/* A function that takes three strings and returns the string that is the longest.  - 6 points */
const longlegs = function(str0, str1, str2)
{
    const card0 = str0.toString().length;
    const card1 = str1.toString().length;
    const card2 = str2.toString().length;

    if(card0 > card1 && card0 > card2){return card0;}
    else if(card1 > card0 && card1 > card2){return card1;}
    else if(card1 > card0 && card1 > card2){return card1;}
    else 
    {
        System.Console.WriteLine("These arguments cannot compete!");
        return "These arguments cannot compete!";
    };
};



/* A function that takes three strings and returns the string that is the longest.  - 6 points */
const compareNum = function(num1, num2)
{
    if(num1 === undefined || num2 === undefined){return null;}
    else if(num1 < num2){return -1;}
    else if(num1 > num2){return 1;}
    else if(num1 === num2){return 0;};
};



/* A function that takes three strings and returns the string that is the longest.  - 6 points */



//#endregion