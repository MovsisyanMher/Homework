//#region Homework 4
//HELPERS
const stringBuilder = (strBack, str, strFront) => {return strBack + str + strFront;};
const reverseArray = (array) => 
{
	let out = [];
	let lngth = array.length - 1;
	while(lngth > -1){out[out.length] = array[lngth]; lngth--;};
	return out;
};

//5. Create a function 'forEach' that takes an array and a function and then calls the given function once with each value in the given array.
const forEach = (array, func) => 
{
	if(!Array.isArray(array)){return null;};
	let lngth = 0;
	while(lngth !== array.length){func(); lngth++;}
};


const triangleStars = (height) => 
{
	if(height === 0 || height === null || height === undefined){console.log("Bad Input")};
	
	let outArray = [];
	let energy = height;
	while(energy > -1)
	{
		outArray[outArray.length] = 
		energy -= 1;
	};
};


//#endregion