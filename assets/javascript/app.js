const canvas = document.getElementById("myCanvas");
const c = canvas.getContext('2d');
game = {
	player: {
		name: "",
		locationX: 0,
		locationY: 0,
		health: 100,
		attack: "",
		canMove: true
	},
	map:{
		level: 1,
		maxHeight: 0,
		maxWidth: 0,
		pointY: 0,
		pointX: 0,
		pointNum: 0,
		roomNum: 5,
		cantMove: 0,
		map:{}
	},
	seedMap: (x,y)=>{
		if(game.map.pointNum<game.map.roomNum){
			let random = Math.floor(Math.random()*4)+1
			console.log(`random: ${random} 
			x: ${x} y: ${y}
			Point Num: ${game.map.pointNum}
			room Num: ${game.map.roomNum}`)
			switch(random){
				case 1:
				try{
					typeof(game.map.map[y-1][x])
				}
				catch(err){
					game.seedMap(x,y);
					break;
				}
					//north
					if(game.map.map[y-1][x]!=undefined && game.map.map[y-1][x]!="P" && game.map.map[y-1][x]!="O"){
						game.map.map[y-1][x] = "O";
						game.map.pointNum++;
						y--
						game.seedMap(x,y);
					}
					else{
						game.seedMap(x,y);
					}
					break;
				case 2:
					//east
				try{
					typeof(game.map.map[y][x+1]);
				}
				catch(err){
					game.seedMap(x,y);
					break;
				}
					if(game.map.map[y][x+1]!=undefined && game.map.map[y][x+1]!="P" && game.map.map[y][x+1]!="O"){
						game.map.map[y][x+1] = "O";
						game.map.pointNum++;
						x++
						game.seedMap(x,y);
					}
					else{
						game.seedMap(x,y);
					}
					break;
				case 3:
					//south
				try{
					typeof(game.map.map[y+1][x])
				}
				catch(err){
					game.seedMap(x,y);
					break;
				}
					if(game.map.map[y+1][x]!=undefined && game.map.map[y+1][x]!="P" && game.map.map[y+1][x]!="O"){
						game.map.map[y+1][x] = "O";
						game.map.pointNum++;
						y++
						game.seedMap(x,y);
					}
					else{
						game.seedMap(x,y);
					}
					break;
				case 4:
					//west
				try{
					typeof(game.map.map[y][x-1])
				}
				catch(err){
					game.seedMap(x,y);
					break;
				}
					if(game.map.map[y][x-1]!=undefined && game.map.map[y][x-1]!="P" && game.map.map[y][x-1]!="O"){
						game.map.map[y][x-1] = "O";
						game.map.pointNum++;
						x--
						game.seedMap(x,y);
					}
					else{
						game.seedMap(x,y);
					}
					break;
			}
		}

	},
	generateMap: ()=>{
		//TODO: MAKE A BETTER MAP
		game.map.maxHeight = ((game.map.level+1)*2)+1
		console.log(game.map.maxHeight);
		game.map.maxWidth = ((game.map.level+1)*2)+1
		console.log(game.map.maxWidth)
		for (var i = 0; i < game.map.maxHeight; i++) {
			game.map.map[i] = []
			for (var d = 0; d < game.map.maxWidth; d++) {
				game.map.map[i].push("x");
			}
		}
		game.player.locationX = Math.floor((game.map.maxWidth)/2)
		game.player.locationY = Math.floor((game.map.maxHeight)/2)
		game.map.map[game.player.locationY][game.player.locationX] = "P"
		game.map.roomNum = game.map.roomNum + game.map.level;
		game.map.pointX = game.player.locationX;
		game.map.pointY = game.player.locationY;
		//check if its the end of the array
		//check if the point being created will touch more than one point
		console.log(game.map.map);
		game.seedMap(game.map.pointX,game.map.pointY);
		console.log(game.map.map);
		//Makes map not hardcoded and random events
		// var randomY = Math.floor(Math.random()*100) + 20;
		// for (var i = 0; i < randomY; i++) {
		// 	game.map[i] = []
		// 	var randomX = Math.floor(Math.random()*100) + 20;
		// 	for (var d = 0; d < randomX; d++) {
		// 		game.map[i].push("x");
		// 	}
		// }
		// //sets player location
		// game.player.locationY = Math.floor(Math.random() * Object.keys(game.map).length)
		// game.player.locationX = Math.floor(Math.random() * game.map[game.player.locationY].length)
		// game.map[game.player.locationY][game.player.locationX] = "<span id='player'>P</span>"
		//TODO: Make events
		game.drawMap();
	},
	checkOOB: (direction)=>{
		//Checks if the user press a location that is out of bounds
		switch(direction){
			case 37:
				//move left switch case
				if(game.map.map[game.player.locationY][game.player.locationX-1]!=undefined&& game.map.map[game.player.locationY][game.player.locationX-1]==="O"){
					game.movePlayer("left");
				}
				break;
			case 38:
				//move up
				//need to check for oob on objects
				try{
					game.map.map[game.player.locationY-1][game.player.locationX]
				}
				catch(err){
					break;
				}
				if(game.map.map[game.player.locationY-1][game.player.locationX]!=undefined&& game.map.map[game.player.locationY-1][game.player.locationX] ==="O"){
					game.movePlayer("up");
				}
				break;
			case 39:
				//move right
				if(game.map.map[game.player.locationY][game.player.locationX+1]!=undefined&& game.map.map[game.player.locationY][game.player.locationX+1]==="O"){
					game.movePlayer("right");
				}
				break;
			case 40:
				//move down
				//need to check for oob on objects
				try{
					game.map.map[game.player.locationY+1][game.player.locationX]
				}
				catch(err){
					break;
				}
				if(game.map.map[game.player.locationY+1][game.player.locationX]!=undefined&& game.map.map[game.player.locationY+1][game.player.locationX] ==="O"){
					game.movePlayer("down");
				}
				break;
		}
	},
	movePlayer: (direction)=>{
		// Moves the user in the direction they pressed
		switch(direction){
			case "up":
				//move player up
				//	clear old place
				game.map.map[game.player.locationY][game.player.locationX] = "O"
				//	change variable
				game.player.locationY--
				//	change player on the map!
				game.map.map[game.player.locationY][game.player.locationX] = "P"
				break;
			case "down":
				//move player down
				//	clear old place
				game.map.map[game.player.locationY][game.player.locationX] = "O"
				//	change variable
				game.player.locationY++
				//	change player on the map!
				game.map.map[game.player.locationY][game.player.locationX] = "P"
				break;
			case "left":
				//move player left
				//	clear old place
				game.map.map[game.player.locationY][game.player.locationX] = "O"
				//	change variable
				game.player.locationX--
				//	change player on the map!
				game.map.map[game.player.locationY][game.player.locationX] = "P"
				break;
			case "right":
				//move player right
				//	clear old place
				game.map.map[game.player.locationY][game.player.locationX] = "O"
				//	change variable
				game.player.locationX++
				//	change player on the map!
				game.map.map[game.player.locationY][game.player.locationX] = "P"
				break;
		}
		game.drawMap()
	},
	whichEvent: ()=>{
		game.player.canMove = false;
		var goodThings = ["plus HP","plus attack","plus money","plus shop"];
		var badThings = ["minus HP","minus attack","minus money","enemy"];
		//TODO: Picks what event happens something good or something bad
		switch(event){
		//	good options
			case "plus HP":
		//		pluss hp
				break;
			case "plus attack":
		//		plus attack
				break;
			case "plus money":
		//		pluss money
				break;
			case "plus shop":
		//		gets shop
				break;
			case "win":
		//		wins?(not sure on win condition yet)
				break;
		//	bad options
			case "minus HP":
		//		minuss hp
				break;
			case "minus attack":
		//		minuss attack
				break;
			case "minus money":
		//		loses money
				break;
			case "enemy":
		//		get encounter
				break;
		}
	},
	battle: ()=>{
		//TODO: Enemies
	},
	drawMap: ()=>{
		//draws on canvas
	c.clearRect(0,0,canvas.height,canvas.width);
	for (var j = 0; j < game.map.maxHeight; j++) {
		for (var i = 1; i < game.map.maxWidth+1; i++) {
			var whichColor;
			var whichBlock = game.map.map[j][i-1]
			switch(whichBlock){
				case "x":
					whichColor = "black";
					break;
				case "O":
					whichColor = "blue";
					break;
				case "P":
					whichColor = "green";
					break;
			}
			c.beginPath()
			c.arc((canvas.width)* i/(game.map.maxWidth+1),
				(canvas.height) * j/(game.map.maxHeight)+300,
				100,
				Math.PI * 2,
				false
				)
			c.fillStyle = whichColor;
			c.fill();
		}
	}
	}
};
$(document).on("keydown",(event)=>{
	if(game.player.canMove){
		if(event.which>=37 && event.which<=40){
		event.preventDefault();
		game.checkOOB(event.which);
		}
	}else{
		//player can't move
	}
});

canvas.height = window.innerHeight;
canvas.width = window.innerWidth;

window.addEventListener("resize",function(){
	canvas.height = window.innerHeight;
	canvas.width = window.innerWidth;
	game.drawMap();
})

game.generateMap();
