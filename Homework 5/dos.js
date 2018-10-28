//#region Prerequisite variables
	const canvas = document.querySelector("canvas"); // Get and store the canvas element
    const c = canvas.getContext("2d");               // Get and store the reference to the 2D toolbox
    const themeColors = ["#ffffff", "#000000", "#101010"]; // The theme colors are white, black, and visual studio dark color
    const colors = ["#ff0000"]; // The colors are white, red, green, blue, and ?something else?
    let gravityF = 0;                            // Set the gravitational force to 0.92 or 0
    let gravity = false;
    let airResistance = 0;                       // Set the air resistance to 0 or 0.992
    let air = false;
    let done = false;                            // We're not done using  page
    let population = 4;
//#endregion Prerequisite variables


//#region Initial adjustments
	canvas.width = window.innerWidth;            // Scale the canvas to X
	canvas.height = window.innerHeight;          // Scale the canvas to Y
	c.fillRect(0,0,canvas.width, canvas.height); // Background color
	let currX = canvas.width;                    // The ending wipe (the X position of the white rectangle of doom)
	let speedOfAnim = 40;                        // The speed at which doom approaches (ending animation)
	let arraybox = [];
	let playerBox = [];
	let score = 0;
//#endregion Initial adjustments


//#region Helpers

	const distance = (x, y, x2, y2) => 
	{
		const xDelta = x2 - x;
		const yDelta = y2 - y;
		return Math.sqrt(xDelta * xDelta, yDelta * yDelta);
	};

	const getWorld = () => 
	{
		return arraybox;
	};

	const createboxes = (count, canvasWidth, canvasHeight) =>
    {
        
        let boxSideLength = 30;                       // The size of the box (px)
        let maxWidth = canvasWidth - boxSideLength;   // Prep up the horizontal space for the summoning ritual
        let maxHeight = canvasHeight - boxSideLength; // Prep up the vertical space for the summoning ritual
        let population = count;                       // Get and store the number of boxes to summon
        
        let outArray = [];                            //  is the container of our boxes
        
        // Populate
        for(k = 0; k < population; k++)
        {
            let currX = Math.random() * maxWidth;
            let currY = Math.random() * maxHeight;
			if(k !== 0)
			{
				for(let j = 0; j < outArray.length; j++)
				{
                    if(this === getWorld()[j]){continue;};
					if
					(
                        // Top left
                        ((currX >= outArray[j].x && currX <= outArray[j].x + boxSideLength) && 
                        (currY >= outArray[j].y && currY <= outArray[j].y + boxSideLength)) || 
                        // Top right
                        ((currX + boxSideLength >= outArray[j].x && currX <= outArray[j].x) && 
                        (currY >= outArray[j].y && currY <= outArray[j].y + boxSideLength)) ||
                        // Bottom left
                        ((currX >= outArray[j].x && currX <= outArray[j].x + boxSideLength) && 
                        (currY + boxSideLength >= outArray[j].y && currY <= outArray[j].y)) ||
                        // Bottom right
                        ((currX + boxSideLength >= outArray[j].x && currX <= outArray[j].x) && 
                        (currY + boxSideLength >= outArray[j].y && currY <= outArray[j].y)) 
					)
					{
						currX = Math.random() * maxWidth;
						currY = Math.random() * maxHeight;
						j = -1;
					};
				};
            };
            outArray[k] = Box(currX, currY, boxSideLength, boxSideLength, colors[0], (Math.random() * 5) - (Math.random() * 5), (Math.random() * 5) - (Math.random() * 5), gravityF, airResistance, canvas.width, canvas.height, c)
        };

        // Output
        return outArray;
    };

//#endregion Helpers


//#region Constructors


    //#region Circle

		const Circle = (x, y, radius, color, outlineColor, speedX, speedY, gravity, airResistance, spaceX, spaceY, context) => 
		{
			const circle = 
			{
				x: x,
				y: y,
				radius: radius,
				color: color, 
				outlineColor: outlineColor,
				speedX: speedX, 
				speedY: speedY, 
				gravity: gravity, 
				airResistance: airResistance, 
				spaceX: spaceX, 
				spaceY: spaceY, 
				context: context,
				draw: () => 
				{
					circle.context.fillStyle = circle.color;
					circle.context.beginPath();
					circle.context.arc(circle.x, circle.y, circle.radius, 0, 2 * Math.PI, false);
					circle.context.closePath();
					circle.context.fill()
					circle.context.fillStyle = circle.outlineColor;
					circle.context.stroke();
				},
				update: () => 
				{
					// X walls
					if(circle.x > circle.spaceX - circle.radius || circle.x <= 0)
					{
						circle.speedX *= -1; // Flips the velocity in X direction
					};

					// Y walls
					if(circle.y > circle.spaceY - circle.radius || circle.y <= 0)
					{
						circle.speedY *= -1; // Flips the velocity in Y direction
					} else if(gravity !== 0)
					{
						circle.speedY += circle.gravity;
					};
		
					// Air resistance
					if(circle.airResistance !== 0)
					{
						circle.speedX *= circle.airResistance;
						circle.speedY *= circle.airResistance;
						if(circle.speedX <= 0.1){circle.speedX = 0};
						if(circle.speedY <= 0.1 && circle.y - circle.radius === 0){circle.speedY = 0; circle.y = (circle.spaceY - circle.radius)};
					}
		
					// Stuck check for beyond X walls
					if(circle.x > circle.spaceX + circle.radius + 1)
					{
						circle.x = (circle.spaceX - circle.radius - 1);
					} else
					{
						circle.x = (circle.x + (circle.speedX / 2));
						circle.y = (circle.y + (circle.speedY / 2));
					};
		
					//Stuck check for beyond Y walls
					if(circle.y > circle.spaceY + circle.radius + 1)
					{
						circle.y = (circle.spaceY - circle.radius - 1);
					} else
					{
						circle.x = (circle.x + (circle.speedX / 2));
						circle.y = (circle.y + (circle.speedY / 2));
					};
					circle.draw();
				}
			};
			return circle;
		};

	//#endregion Circle


	//#region Box

		const Box = (x, y, width, height, color, speedX, speedY, gravity, airResistance, spaceX, spaceY, context) => 
		{
			const box = 
			{
				x: x,
				y: y,
				width: width,
				height: height,
				color: color, 
				speedX: speedX, 
				speedY: speedY, 
				gravity: gravity, 
				airResistance: airResistance, 
				spaceX: spaceX, 
				spaceY: spaceY, 
				context: context,
				draw: () => 
				{
					box.context.fillStyle = box.color;
					box.context.fillRect(box.x, box.y, box.width, box.height);
				},
				update: () => 
				{
					box.spaceX = canvas.width;
					box.spaceY = canvas.height;
					// X walls
					if(box.x > box.spaceX - box.width || box.x <= 0)
					{
						box.speedX *= -1; // Flips the velocity in X direction
					};

					// Y walls
					if(box.y > box.spaceY - box.height || box.y <= 0)
					{
						box.speedY *= -1; // Flips the velocity in Y direction
					} else if(gravity !== 0)
					{
						box.speedY += box.gravity;
					};

					// Object collision
					for(let p = 0; p < getWorld().length; p++)
					{
						if
						(
							box.color === "green" &&
							// Top left
							(((box.x >= getWorld()[p].x && box.x <= getWorld()[p].x + getWorld()[p].width) && 
							(box.y >= getWorld()[p].y && box.y <= getWorld()[p].y + getWorld()[p].height)) || 
							// Top right
							((box.x + box.width >= getWorld()[p].x && box.x + box.width <= getWorld()[p].x + getWorld()[p].width) && 
							(box.y >= getWorld()[p].y && box.y <= getWorld()[p].y + getWorld()[p].height)) ||
							// Bottom left
							((box.x >= getWorld()[p].x && box.x <= getWorld()[p].x + getWorld()[p].width) && 
							(box.y + box.height >= getWorld()[p].y && box.y + box.height <= getWorld()[p].y + getWorld()[p].height)) ||
							// Bottom right
							((box.x + box.width >= getWorld()[p].x && box.x + box.width <= getWorld()[p].x + getWorld()[p].width) && 
							(box.y + box.height >= getWorld()[p].y && box.y + box.height <= getWorld()[p].y + getWorld()[p].height)))
						)
						{
							alert("Game over, you scored: " + score);
						};
						if(this === getWorld()[p]){continue;};
						if
						(
							// Top left
							((box.x >= getWorld()[p].x && box.x <= getWorld()[p].x + getWorld()[p].width) && 
							(box.y >= getWorld()[p].y && box.y <= getWorld()[p].y + getWorld()[p].height)) || 
							// Top right
							((box.x + box.width >= getWorld()[p].x && box.x + box.width <= getWorld()[p].x + getWorld()[p].width) && 
							(box.y >= getWorld()[p].y && box.y <= getWorld()[p].y + getWorld()[p].height)) ||
							// Bottom left
							((box.x >= getWorld()[p].x && box.x <= getWorld()[p].x + getWorld()[p].width) && 
							(box.y + box.height >= getWorld()[p].y && box.y + box.height <= getWorld()[p].y + getWorld()[p].height)) ||
							// Bottom right
							((box.x + box.width >= getWorld()[p].x && box.x + box.width <= getWorld()[p].x + getWorld()[p].width) && 
							(box.y + box.height >= getWorld()[p].y && box.y + box.height <= getWorld()[p].y + getWorld()[p].height)) 
						)
						{
							let transferEnergyX = box.speedX;
							let transferEnergyY = box.speedY;
							box.speedX = getWorld()[p].speedX;
							box.speedY = getWorld()[p].speedY;
							getWorld()[p].speedX = transferEnergyX;
							getWorld()[p].speedY = transferEnergyY;
						};
					}


					// Air resistance
					if(box.airResistance !== 0)
					{
						box.speedX *= box.airResistance;
						box.speedY *= box.airResistance;
						if(box.speedX <= 0.1){box.speedX = 0};
						if(box.speedY <= 0.1 && box.y - box.height === 0){box.speedY = 0; box.y = (box.spaceY - box.height)};
					}

					// Stuck check for beyond X walls
					if(box.x > box.spaceX + box.width + 1)
					{
						box.x = (box.spaceX - box.width - 1);
					} else
					{
						box.x = (box.x + (box.speedX / 2));
						box.y = (box.y + (box.speedY / 2));
					};

					//Stuck check for beyond Y walls
					if(box.y > box.spaceY + box.width + 1)
					{
						box.y = (box.spaceY - box.height - 1);
					} else
					{
						box.x = (box.x + (box.speedX / 2));
						box.y = (box.y + (box.speedY / 2));
					};
					box.draw();
				}
			}
			return box;
		};

	//#endregion Box


	//#region Arrow
	
		const Arrow = (x, y, width, height, right, color, outlineColor, speedX, speedY, gravity, airResistance, spaceX, spaceY, context) => 
		{
			const arrow = 
			{
				x: x,
				y: y,
				width: width,
				height: height,
				right: right,
				color: color,
				outlineColor: outlineColor,
				speedX: speedX, 
				speedY: speedY, 
				gravity: gravity, 
				airResistance: airResistance, 
				spaceX: spaceX, 
				spaceY: spaceY, 
				context: context,
				draw: () => 
				{
					arrow.context.strokeStyle = arrow.outlineColor;
					arrow.context.fillStyle = arrow.color;
					arrow.context.beginPath();
					if(arrow.right)
					{
						arrow.context.moveTo(arrow.x, arrow.y + (arrow.height / 3))
						arrow.context.lineTo(arrow.x + arrow.width / 2, arrow.y + (arrow.height / 3));
						arrow.context.lineTo(arrow.x + arrow.width / 2, arrow.y);
						arrow.context.lineTo(arrow.x + arrow.width, arrow.y + arrow.height / 2);
						arrow.context.lineTo(arrow.x + arrow.width / 2, arrow.y + arrow.height);
						arrow.context.lineTo(arrow.x + arrow.width / 2, arrow.y + 2 * arrow.height / 3);
						arrow.context.lineTo(arrow.x, arrow.y + (2 * arrow.height / 3));
						arrow.context.lineTo(arrow.x, arrow.y + (arrow.height / 3));
					} else 
					{
						arrow.context.moveTo(arrow.x + arrow.width, arrow.y + (arrow.height / 3))
						arrow.context.lineTo(arrow.x + arrow.width / 2, arrow.y + (arrow.height / 3));
						arrow.context.lineTo(arrow.x + arrow.width / 2, arrow.y);
						arrow.context.lineTo(arrow.x,  arrow.y + arrow.height / 2);
						arrow.context.lineTo(arrow.x + arrow.width / 2, arrow.y + arrow.height);
						arrow.context.lineTo(arrow.x + arrow.width / 2, arrow.y + 2 * arrow.height / 3);
						arrow.context.lineTo(arrow.x + arrow.width, arrow.y + (2 * arrow.height / 3));
						arrow.context.lineTo(arrow.x + arrow.width, arrow.y + (arrow.height / 3));
					}
					arrow.context.stroke();
					arrow.context.fill();
					arrow.context.closePath();
				},
				update: () => 
				{
					// X walls
					if(arrow.x > arrow.spaceX - arrow.width || arrow.x <= 0)
					{
						arrow.speedX *= -1; // Flips the velocity in X direction
						
					};

					// Y walls
					if(arrow.y > arrow.spaceY - arrow.height || arrow.y <= 0)
					{
						arrow.speedY *= -1; // Flips the velocity in Y direction
					} else if(gravity !== 0)
					{
						arrow.speedY += arrow.gravity;
					};

					// Air resistance
					if(arrow.airResistance !== 0)
					{
						arrow.speedX *= arrow.airResistance;
						arrow.speedY *= arrow.airResistance;
						if(arrow.speedX <= 0.1){arrow.speedX = 0};
						if(arrow.speedY <= 0.1 && arrow.y - arrow.height === 0){arrow.speedY = 0; arrow.y = (arrow.spaceY - arrow.height)};
					}

					// Stuck check for beyond X walls
					if(arrow.x > arrow.spaceX + arrow.width + 1)
					{
						arrow.speedX *= -1;
						arrow.x = (arrow.spaceX - arrow.width - 1);
					} else
					{
						arrow.x = (arrow.x + (arrow.speedX / 2));
						arrow.y = (arrow.y + (arrow.speedY / 2));
					};

					//Stuck check for beyond Y walls
					if(arrow.y > arrow.spaceY + arrow.width + 1)
					{
						arrow.speedY *= -1;
						arrow.y = (arrow.spaceY - arrow.height - 1);
					} else
					{
						arrow.x = (arrow.x + (arrow.speedX / 2));
						arrow.y = (arrow.y + (arrow.speedY / 2));
					};
					arrow.draw();
				}
			}
			return arrow;
		};

	//#endregion Arrow


//#endregion Constructors


// Build the objects in the screen
	let arrowButton = Arrow(canvas.width - 100, 20, 80, 48, true, themeColors[0], themeColors[1], 0, 0, 0, 0, canvas.width, canvas.height, c);
	arraybox = createboxes(population, canvas.width, canvas.height);
	playerBox = createboxes(1, canvas.width, canvas.height);
	playerBox[0].color = "green";
	playerBox[0].update = () => 
	{
		playerBox[0].spaceX = canvas.width;
		playerBox[0].spaceY = canvas.height;
		// X walls
		if(playerBox[0].x > playerBox[0].spaceX - playerBox[0].width || playerBox[0].x <= 0)
		{
			playerBox[0].speedX *= -1; // Flips the velocity in X direction
		};

		// Y walls
		if(playerBox[0].y > playerBox[0].spaceY - playerBox[0].height || playerBox[0].y <= 0)
		{
			playerBox[0].speedY *= -1; // Flips the velocity in Y direction
		} else if(gravity !== 0)
		{
			playerBox[0].speedY += playerBox[0].gravity;
		};

		// Object collision
		for(let p = 0; p < getWorld().length; p++)
		{
			if
			(
				playerBox[0].color === "green" &&
				// Top left
				(((playerBox[0].x >= getWorld()[p].x && playerBox[0].x <= getWorld()[p].x + getWorld()[p].width) && 
				(playerBox[0].y >= getWorld()[p].y && playerBox[0].y <= getWorld()[p].y + getWorld()[p].height)) || 
				// Top right
				((playerBox[0].x + playerBox[0].width >= getWorld()[p].x && playerBox[0].x + playerBox[0].width <= getWorld()[p].x + getWorld()[p].width) && 
				(playerBox[0].y >= getWorld()[p].y && playerBox[0].y <= getWorld()[p].y + getWorld()[p].height)) ||
				// Bottom left
				((playerBox[0].x >= getWorld()[p].x && playerBox[0].x <= getWorld()[p].x + getWorld()[p].width) && 
				(playerBox[0].y + playerBox[0].height >= getWorld()[p].y && playerBox[0].y + playerBox[0].height <= getWorld()[p].y + getWorld()[p].height)) ||
				// Bottom right
				((playerBox[0].x + playerBox[0].width >= getWorld()[p].x && playerBox[0].x + playerBox[0].width <= getWorld()[p].x + getWorld()[p].width) && 
				(playerBox[0].y + playerBox[0].height >= getWorld()[p].y && playerBox[0].y + playerBox[0].height <= getWorld()[p].y + getWorld()[p].height)))
			)
			{
				arraybox = createboxes(population, canvas.width, canvas.height);
				alert("Game over, you scored: " + score);
				score = 0;
			};
		}


		// Air resistance
		if(playerBox[0].airResistance !== 0)
		{
			playerBox[0].speedX *= playerBox[0].airResistance;
			playerBox[0].speedY *= playerBox[0].airResistance;
			if(playerBox[0].speedX <= 0.1){playerBox[0].speedX = 0};
			if(playerBox[0].speedY <= 0.1 && playerBox[0].y - playerBox[0].height === 0){playerBox[0].speedY = 0; playerBox[0].y = (playerBox[0].spaceY - playerBox[0].height)};
		}

		// Stuck check for beyond X walls
		if(playerBox[0].x > playerBox[0].spaceX + playerBox[0].width + 1)
		{
			playerBox[0].x = (playerBox[0].spaceX - playerBox[0].width - 1);
		} else
		{
			playerBox[0].x = (playerBox[0].x + (playerBox[0].speedX / 2));
			playerBox[0].y = (playerBox[0].y + (playerBox[0].speedY / 2));
		};

		//Stuck check for beyond Y walls
		if(playerBox[0].y > playerBox[0].spaceY + playerBox[0].width + 1)
		{
			playerBox[0].y = (playerBox[0].spaceY - playerBox[0].height - 1);
		} else
		{
			playerBox[0].x = (playerBox[0].x + (playerBox[0].speedX / 2));
			playerBox[0].y = (playerBox[0].y + (playerBox[0].speedY / 2));
		};
		playerBox[0].draw();
	};
	let gravCheck = Circle(20, 23, 10, themeColors[0], themeColors[1], 0, 0, 0, 0, canvas.width, canvas.height, c);
	let airCheck = Circle(20, 58, 10, themeColors[0], themeColors[1], 0, 0, 0, 0, canvas.width, canvas.height, c);
	let minusPopBox = Circle(40, 100, 20, themeColors[0], themeColors[1], 0, 0, 0, 0, canvas.width, canvas.height, c);
	let areaPopBox = Circle(90, 100, 20, themeColors[0], themeColors[1], 0, 0, 0, 0, canvas.width, canvas.height, c);
	let plusPopBox = Circle(140, 100, 20, themeColors[0], themeColors[1], 0, 0, 0, 0, canvas.width, canvas.height, c);

// Set the redirect action to only trigger once
let redirectVrgn = true;
const redirect = () => 
{
	if(redirectVrgn)
	{
		redirectVrgn = false;
		window.location.replace("https://MovsisyanMher.github.io")
		return true;
	}
}

// Run  every frame
const animate = () => 
{
	requestAnimationFrame(animate);                // Tells the browser to run  at 60fps (less if lag, more if good monitor)
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
	c.fillStyle = themeColors[1];                  // Sets the background color to Black
	c.fillRect(0, 0, canvas.width, canvas.height); // Clears the canvas
	for(let j = 0; j < arraybox.length; j++)
	{
		arraybox[j].update(); // Contains the draw()
	};
	arrowButton.draw();
	playerBox[0].speedX = 0;
	playerBox[0].speedY = 0;
	playerBox[0].update();
	c.font = "20px Segoe UI";
	c.fillStyle = themeColors[0];
	c.fillText("Gravity", 40, 30);
	c.fillText("Air Resistance", 40, 65);
	if(gravity)
	{
		gravCheck = Circle(20, 23, 10, colors[2], themeColors[1], 0, 0, 0, 0, canvas.width, canvas.height, c);
	} 
	else 
	{
		gravCheck = Circle(20, 23, 10, colors[0], themeColors[1], 0, 0, 0, 0, canvas.width, canvas.height, c);
	};
	if(air)
	{
		airCheck = Circle(20, 58, 10, colors[2], themeColors[1], 0, 0, 0, 0, canvas.width, canvas.height, c);
	}
	else 
	{
		airCheck = Circle(20, 58, 10, colors[0], themeColors[1], 0, 0, 0, 0, canvas.width, canvas.height, c);
	};
	gravCheck.draw();
	airCheck.draw();
	minusPopBox.draw();
	areaPopBox.draw();
	plusPopBox.draw();
	c.font = "20px Segoe UI Bold";
	c.fillText(population, 80, 107);
	c.font = "40px Segoe UI Bold";
	c.fillText("-", 33, 110);
	c.fillText("+", 128, 115);
	c.fillStyle = themeColors[0];
	c.fillText("Score: " + Math.floor(score), canvas.width/2 - 100, 60);
	for(let l = 0; l < getWorld().length; l++)
	{
		score += 1/distance(playerBox[0].x, playerBox[0].y, getWorld()[l].x, getWorld()[l].y);
	};
	
	if(done)
	{
		//Play the exit animation
		if(currX > 0)
		{
			currX -= speedOfAnim;
			c.clearRect(currX, 0, canvas.width * 2, canvas.height * 2);
		} 
		else
		{
			c.clearRect(0,0,canvas.width, canvas.height);
			redirect();
		};
	};
	
};

animate();

//#region Event Handlers

    // Reacts to the browser resize
    window.addEventListener("resize", (event) => 
    {
        canvas.width = window.innerWidth;
		canvas.height = window.innerHeight;
		arrowButton = Arrow(canvas.width - 100, 20, 80, 48, true, themeColors[0], themeColors[1], 0, 0, 0, 0, canvas.width, canvas.height, c);
    })

	// Keyboard listener
	window.addEventListener("mousemove", (event) => 
	{
		playerBox[0].x = event.clientX - playerBox[0].width/2;
		playerBox[0].y = event.clientY - playerBox[0].height/2;
	}, false)

	


    // Reacts to mouse click
    window.addEventListener("click", (event) => 
    {
        // If the user clicks the button
        if(event.x >= canvas.width - 100 && event.x <= canvas.width - 20 && event.y >= 20 && event.y <= 80)
        {
            done = true;
        } 
        else if(event.x >= 10 && event.x <= 30 && event.y >= 13 && event.y <= 33 && !gravity)
        {
            //gravityF = 0.92;
			//gravity = true;
			playerBox = createboxes(1, canvas.width, canvas.height);
			playerBox[0].color = "green";
            arraybox = createboxes(population, canvas.width, canvas.height);
            arrowButton = Arrow(canvas.width - 100, 20, 80, 48, true, themeColors[0], themeColors[1], 0, 0, 0, 0, canvas.width, canvas.height, c);
        }
        else if(event.x >= 10 && event.x <= 30 && event.y >= 13 && event.y <= 33 && gravity)
        {
            //gravityF = 0;
			//gravity = false;
			playerBox = createboxes(1, canvas.width, canvas.height);
			playerBox[0].color = "green";
            arraybox = createboxes(population, canvas.width, canvas.height);
            arrowButton = Arrow(canvas.width - 100, 20, 80, 48, true, themeColors[0], themeColors[1], 0, 0, 0, 0, canvas.width, canvas.height, c);
        } 
        else if(event.x >= 10 && event.x <= 30 && event.y >= 48 && event.y <= 68 && !air)
        {
            //airResistance = 0.992;
			//air = true;
			playerBox = createboxes(1, canvas.width, canvas.height);
			playerBox[0].color = "green";
            arraybox = createboxes(population, canvas.width, canvas.height);
            arrowButton = Arrow(canvas.width - 100, 20, 80, 48, true, themeColors[0], themeColors[1], 0, 0, 0, 0, canvas.width, canvas.height, c);
        }
        else if(event.x >= 10 && event.x <= 30 && event.y >= 48 && event.y <= 68 && air)
        {
            //airResistance = 0;
			//air = false;
			playerBox = createboxes(1, canvas.width, canvas.height);
			playerBox[0].color = "green";
            arraybox = createboxes(population, canvas.width, canvas.height);
            arrowButton = Arrow(canvas.width - 100, 20, 80, 48, true, themeColors[0], themeColors[1], 0, 0, 0, 0, canvas.width, canvas.height, c);
        }
        else if(event.x >= 20 && event.x <= 60 && event.y >= 80 && event.y <= 120)
        {
			population--;
			playerBox = createboxes(1, canvas.width, canvas.height);
			playerBox[0].color = "green";
            arraybox = createboxes(population, canvas.width, canvas.height);
            arrowButton = Arrow(canvas.width - 100, 20, 80, 48, true, themeColors[0], themeColors[1], 0, 0, 0, 0, canvas.width, canvas.height, c);
        }
        else if(event.x >= 120 && event.x <= 160 && event.y >= 80 && event.y <= 120)
        {
			population++;
			playerBox = createboxes(1, canvas.width, canvas.height);
			playerBox[0].color = "green";
            arraybox = createboxes(population, canvas.width, canvas.height);
            arrowButton = Arrow(canvas.width - 100, 20, 80, 48, true, themeColors[0], themeColors[1], 0, 0, 0, 0, canvas.width, canvas.height, c);
        }
        else 
        {
			playerBox = createboxes(1, canvas.width, canvas.height);
			playerBox[0].color = "green";
            arraybox = createboxes(population, canvas.width, canvas.height); 
            arrowButton = Arrow(canvas.width - 100, 20, 80, 48, true, themeColors[0], themeColors[1], 0, 0, 0, 0, canvas.width, canvas.height, c);
        }
    })

//#endregion Event Handlers