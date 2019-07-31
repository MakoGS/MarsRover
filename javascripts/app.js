//Instructions
// landRover(rover) to land automatically rover1 or rover2 in the grid. 
// generateObstacles(number) to create a determinate number of obstacles.
// run("FRBL", rover) to move rover1 or rover2 when F= forward, R= right, B= backwards and L= left.



var rover0 = {
  alias: "R0",
  direction: "N",
  x: 0,
  y: 0,
  travelog: []
}

var rover1 = {
  alias: "R1",
  direction: "N",
  x: 0,
  y: 0,
  travelog: []
}

var directions = ["N", "S", "W", "E",]

var grid = [
  [null, null, null, null, null, null, null, null, null, null ],
  [null, null, null, null, null, null, null, null, null, null ],
  [null, null, null, null, null, null, null, null, null, null ],
  [null, null, null, null, null, null, null, null, null, null ],
  [null, null, null, null, null, null, null, null, null, null ],
  [null, null, null, null, null, null, null, null, null, null ],
  [null, null, null, null, null, null, null, null, null, null ],
  [null, null, null, null, null, null, null, null, null, null ],  
  [null, null, null, null, null, null, null, null, null, null ],
  [null, null, null, null, null, null, null, null, null, null ],
];

function randomNumber() {
  return Math.floor(Math.random() * 9)
}

function landRover(rover) {
  var row = randomNumber();
  var column = randomNumber();
  grid[row][column] = rover.alias;
  rover.direction = directions[Math.floor(Math.random() * 4)];
  rover.x = column;
  rover.y = row;
  console.log(`${rover} landed at: X: ${column} - Y: ${row} facing ${rover.direction}`);
  console.table(grid);
}

function generateObstacle(totalObstacles) {
  var totalObstacles = totalObstacles;
  for (var i = 1; i <= totalObstacles; i++) {
  var row = randomNumber();
  var column = randomNumber();
  if (grid[row][column] == null) {
grid[row][column] = "O";
  } 
  else {
  i -= 1;
}
console.log(`Obstacle at: X: ${column} - Y: ${row}`);
  }
  console.table(grid);
}

function turnLeft(rover){
  switch (rover.direction) {
    case "N":
        console.log("turnLeft was called! Rover is now facing West");
        rover.direction = "W";
        break;
        case "E":
            console.log("turnLeft was called! Rover is now facing North");
            rover.direction = "N";
            break;
        case "S":
            console.log("turnLeft was called! Rover is now facing East");
            rover.direction = "E";
            break;
        case "W":
            console.log("turnLeft was called! Rover is now facing South");
            rover.direction = "S";
            break;
      }
}

function turnRight(rover){
  switch (rover.direction) {
    case "N":
        console.log("turnRight was called! Rover is now facing East");
        rover.direction = "E";
        break;
        case "E":
            console.log("turnRight was called! Rover is now facing South");
            rover.direction = "S";
            break;
        case "S":
            console.log("turnRight was called! Rover is now facing West");
            rover.direction = "W";
            break;
        case "W":
            console.log("turnRight was called! Rover is now facing North");
            rover.direction = "N";
            break;
      }
}

function moveForward(rover) {
  var prevX = rover.x;
  var prevY = rover.y;
  switch (rover.direction) {
    case "W":
      rover.x -= 1;
      break;
      case "N":
          rover.y -= 1;
          break;
          case "S":
              rover.y += 1;
              break;
              case "E":
                rover.x += 1;
                break;
              }
              if (rover.x < 0 || rover.y < 0 || rover.x > 9 || rover.y > 9) {
                console.log("Out of the grid. Move sideways or backwards");
                rover.x = prevX;
                rover.y = prevY;
              }
                else if (grid[rover.y][rover.x] == "O") {
                  console.log("Obstacle detected. Move sideways or backwards");
                  rover.x = prevX;
                  rover.y = prevY;
                } 
                else if (grid[rover.y][rover.x] == "R1" || grid[rover.y][rover.x] == "R2") {
                  console.log("Rover detected. Move sideways or backwards");
                  rover.x = prevX;
                  rover.y = prevY;
                } else {
            rover.travelog.push(`X: ${rover.x} - Y: ${+ rover.y}`)
            console.log(rover.alias, "new position is: X:" + rover.x, "- Y:" + rover.y);
            grid[prevY][prevX] = null;
            grid[rover.y][rover.x] = rover.alias;
  }
}

  function moveBackward(rover) {
    var prevX = rover.x;
    var prevY = rover.y;
    switch (rover.direction) {
      case "W":
        rover.x += 1;
        break;
        case "N":
            rover.y += 1;
            break;
            case "S":
                rover.y -= 1;
                break;
                case "E":
                  rover.x -= 1;
                  break;
                }
                if (rover.x < 0 || rover.y < 0 || rover.x > 9 || rover.y > 9) {
                  console.log("Out of the grid. Move sideways or backwards");
                  rover.x = prevX;
                  rover.y = prevY;
                }
                  else if (grid[rover.x][rover.y] != null) {
                    console.log("Obstacle detected. Move sideways or backwards");
                    rover.x = prevX;
                    rover.y = prevY;
                  }
                 else {
              rover.travelog.push(`X: ${rover.x} - Y: ${+ rover.y}`)
              console.log(rover.alias, "new position is: X:" + rover.x, "- Y:" + rover.y);
              grid[prevY][prevX] = null;
              grid[rover.y][rover.x] = rover.alias;
    }
  }

function run(commands, rover) {
  for (var i = 0; i < commands.length; i++) {
    switch (commands[i]) {
      case "L":
      turnLeft(rover);
      break;
      case "R":
          turnRight(rover);
          break;
      case "F":
          moveForward(rover);
          break;
          case "B":
            moveBackward(rover);
            break;
          default:
          console.log("Invalid command! It can only be: 'F', 'R', 'B' or 'L'");
          break;
    }
    }
    console.table(grid);
  }