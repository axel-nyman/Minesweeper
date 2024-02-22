const menu = document.querySelector(".menu");
const header = document.querySelector(".header");
const smiley = document.getElementById("smileyface");

var NumberOfColumns = 1;
var NumberOfRows = 1;
var NumberOfMines = 0;
var mineCounter = NumberOfMines;
var timer = 0;
var numberOfClicks = 0;
var interval = null;
var counter = document.getElementById("counter");
var isGameOver = false;

const TILE_STATUSES = {
  HIDDEN: "hidden",
  MINE: "mine",
  PASSIVE_MINE: "passiveMine",
  HIDDEN_MINE: "hiddenMine",
  FLAGGED: "flagged",
  FLAGGED_MINE: "flaggedMine",
  MISFLAGGED: "misflagged",

  ONE: "one",
  TWO: "two",
  THREE: "three",
  FOUR: "four",
  FIVE: "five",
  SIX: "six",
  SEVEN: "seven",
  EIGHT: "eight",
  ZERO: "zero",
};

function createBoard(columns, rows, mines) {
  document.getElementById("you-lose").style.display = "none";
  document.getElementById("you-win").style.display = "none";
  isGameOver = false;
  const board = [];
  smiley.className = "happy button";
  numberOfClicks = 0;
  for (x = 0; x < rows; x++) {
    const row = [];
    for (y = 0; y < columns; y++) {
      const element = document.createElement("div");
      element.dataset.status = TILE_STATUSES.HIDDEN;
      element.addEventListener("click", function () {
        if (isGameOver) {
          return;
        }
        click(tile);
      });
      element.addEventListener("mousedown", (event) => {
        if (isGameOver) {
          return;
        }
        if (event.button == 0) {
          smiley.className = "click button";
        }
      });
      element.addEventListener("contextmenu", (event) => {
        event.preventDefault();
        if (isGameOver) {
          return;
        }
        if (event.target.dataset.status === TILE_STATUSES.HIDDEN) {
          event.target.dataset.status = TILE_STATUSES.FLAGGED;
          mineCounter--;
          updateMineCounter();
        } else if (event.target.dataset.status === TILE_STATUSES.HIDDEN_MINE) {
          event.target.dataset.status = TILE_STATUSES.FLAGGED_MINE;
          mineCounter--;
          updateMineCounter();
        } else if (event.target.dataset.status === TILE_STATUSES.FLAGGED) {
          event.target.dataset.status = TILE_STATUSES.HIDDEN;
          mineCounter++;
          updateMineCounter();
        } else if (event.target.dataset.status === TILE_STATUSES.FLAGGED_MINE) {
          event.target.dataset.status = TILE_STATUSES.HIDDEN_MINE;
          mineCounter++;
          updateMineCounter();
        }
      });
      const tile = { element, x, y };
      row.push(tile);
    }
    board.push(row);
  }

  return board;
}

function click(tile) {
  firstClick(tile);

  const status = tile.element.dataset.status;
  if (status === TILE_STATUSES.HIDDEN_MINE) {
    tile.element.dataset.status = TILE_STATUSES.MINE;
    clearInterval(interval);
    smiley.className = "dead button";
    document.getElementById("you-lose").style.display = "block";
    isGameOver = true;
    board.forEach((row) => {
      row.forEach((tile) => {
        if (tile.element.dataset.status === TILE_STATUSES.HIDDEN_MINE) {
          tile.element.dataset.status = TILE_STATUSES.PASSIVE_MINE;
        }
        if (tile.element.dataset.status === TILE_STATUSES.FLAGGED) {
          tile.element.dataset.status = TILE_STATUSES.MISFLAGGED;
        }
      });
    });
  } else if (status === TILE_STATUSES.HIDDEN) {
    smiley.className = "happy button";
    calculate(tile);
    checkWin();
  } else {
    smiley.className = "happy button";
  }
}

function calculate(tile) {
  numberOfClicks++;
  var nearbyMines = 0;
  for (let x = tile.x - 1; x <= tile.x + 1; x++) {
    for (let y = tile.y - 1; y <= tile.y + 1; y++) {
      if (x < 0 || y < 0 || x >= NumberOfRows || y >= NumberOfColumns) {
        continue;
      }
      if (
        board[x][y].element.dataset.status === TILE_STATUSES.HIDDEN_MINE ||
        board[x][y].element.dataset.status === TILE_STATUSES.FLAGGED_MINE
      ) {
        nearbyMines++;
      }
    }
  }
  if (nearbyMines == 0) {
    tile.element.dataset.status = TILE_STATUSES.ZERO;
    for (let x = tile.x - 1; x <= tile.x + 1; x++) {
      for (let y = tile.y - 1; y <= tile.y + 1; y++) {
        if (x < 0 || y < 0 || x >= NumberOfRows || y >= NumberOfColumns) {
          continue;
        }
        if (board[x][y].element.dataset.status === TILE_STATUSES.HIDDEN) {
          calculate(board[x][y]);
        }
      }
    }
    return;
  }

  if (nearbyMines == 1) {
    tile.element.dataset.status = TILE_STATUSES.ONE;
  } else if (nearbyMines == 2) {
    tile.element.dataset.status = TILE_STATUSES.TWO;
  } else if (nearbyMines == 3) {
    tile.element.dataset.status = TILE_STATUSES.THREE;
  } else if (nearbyMines == 4) {
    tile.element.dataset.status = TILE_STATUSES.FOUR;
  } else if (nearbyMines == 5) {
    tile.element.dataset.status = TILE_STATUSES.FIVE;
  } else if (nearbyMines == 6) {
    tile.element.dataset.status = TILE_STATUSES.SIX;
  } else if (nearbyMines == 7) {
    tile.element.dataset.status = TILE_STATUSES.SEVEN;
  } else if (nearbyMines == 8) {
    tile.element.dataset.status = TILE_STATUSES.EIGHT;
  }
}

function checkWin() {
  for (let x = 0; x < NumberOfRows; x++) {
    for (let y = 0; y < NumberOfColumns; y++) {
      const status = board[x][y].element.dataset.status;
      if (status === TILE_STATUSES.HIDDEN) {
        return;
      }
      if (status === TILE_STATUSES.FLAGGED) {
        return;
      }
    }
  }
  for (let x = 0; x < NumberOfRows; x++) {
    for (let y = 0; y < NumberOfColumns; y++) {
      const status = board[x][y].element.dataset.status;
      if (status === TILE_STATUSES.HIDDEN_MINE) {
        board[x][y].element.dataset.status = TILE_STATUSES.FLAGGED_MINE;
        mineCounter--;
        updateMineCounter();
      }
    }
  }
  console.log("YOU WIN");
  smiley.className = "cool button";
  document.getElementById("you-win").style.display = "block";
  isGameOver = true;
  clearInterval(interval);
}

function firstClick(tile) {
  if (numberOfClicks != 0) {
    return;
  }

  interval = setInterval(updateTimer, 1000);
  var mineCount = 0;
  while (mineCount < NumberOfMines) {
    test: {
      const random =
        board[Math.floor(Math.random() * NumberOfRows)][
          Math.floor(Math.random() * NumberOfColumns)
        ];
      for (let x = tile.x - 1; x <= tile.x + 1; x++) {
        for (let y = tile.y - 1; y <= tile.y + 1; y++) {
          if (x < 0 || y < 0 || x >= NumberOfRows || y >= NumberOfColumns) {
            continue;
          }
          if (random === board[x][y]) {
            break test;
          }
        }
      }
      if (
        random.element.dataset.status !== TILE_STATUSES.HIDDEN_MINE &&
        random.element.dataset.status !== TILE_STATUSES.FLAGGED_MINE
      ) {
        if (random.element.dataset.status === TILE_STATUSES.FLAGGED) {
          random.element.dataset.status = TILE_STATUSES.FLAGGED_MINE;
        } else {
          random.element.dataset.status = TILE_STATUSES.HIDDEN_MINE;
        }
        mineCount++;
      }
    }
  }
}

function beginner() {
  NumberOfColumns = 9;
  NumberOfRows = 9;
  NumberOfMines = 10;
  createBoardElement();
  menu.style.display = "none";
}

function intermediate() {
  NumberOfColumns = 16;
  NumberOfRows = 16;
  NumberOfMines = 40;
  createBoardElement();
  menu.style.display = "none";
}

function expert() {
  NumberOfColumns = 30;
  NumberOfRows = 16;
  NumberOfMines = 99;
  createBoardElement();
  menu.style.display = "none";
}

function createBoardElement() {
  board = createBoard(NumberOfColumns, NumberOfRows, NumberOfMines);
  boardElement.style.display = "grid";
  header.style.display = "flex";
  board.forEach((row) => {
    row.forEach((tile) => {
      boardElement.append(tile.element);
    });
  });
  boardElement.style.setProperty("--columns", NumberOfColumns);
  boardElement.style.setProperty("--rows", NumberOfRows);
  mineCounter = NumberOfMines;
  updateMineCounter();
}

function updateMineCounter() {
  var hundreds = document.getElementById("mines-hundreds");
  var tens = document.getElementById("mines-tens");
  var ones = document.getElementById("mines-ones");
  var number = mineCounter.toString();

  while (number.length < 3) {
    number = "0" + number;
  }
  hundreds.className = "numb" + number[0];
  tens.className = "numb" + number[1];
  ones.className = "numb" + number[2];
  console.log(number);
}

function updateTimer() {
  timer++;

  var hundreds = document.getElementById("timer-hundreds");
  var tens = document.getElementById("timer-tens");
  var ones = document.getElementById("timer-ones");
  var number = timer.toString();

  while (number.length < 3) {
    number = "0" + number;
  }
  hundreds.className = "numb" + number[0];
  tens.className = "numb" + number[1];
  ones.className = "numb" + number[2];
  console.log(number);
}

function reset() {
  board = null;
  boardElement.innerHTML = null;
  boardElement.style.display = "none";
  menu.style.display = "block";
  header.style.display = "none";
  clearInterval(interval);
  timer = -1;
  updateTimer();
}

var board;
const boardElement = document.querySelector(".board");

boardElement.style.display = "none";
header.style.display = "none";
