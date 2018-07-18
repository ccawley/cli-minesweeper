// Generates the player's board.
const generatePlayerBoard = (numberOfRows, numberOfColumns) => {
  let board = [];

  for (let CurrRow = 0; CurrRow <= numberOfRows; CurrRow++) {
    let row = [];
    for (let currColumn = 0; currColumn <= numberOfColumns; currColumn++) {
      row.push(' ');
    };
    board.push(row);
  };

  return board;
};

//Generates the board that stores the bomb layout.
const generateBombBoard = (numberOfRows, numberOfColumns, numberOfBombs) => {
  let board = [];

  for (let CurrRow = 0; CurrRow <= numberOfRows; CurrRow++) {
    let row = [];
    for (let currColumn = 0; currColumn <= numberOfColumns; currColumn++) {
      row.push(null);
    };
    board.push(row);
  };

  let numberOfBombsPlaced = 0;

  // This loop randomly places bombs on the board.
  while (numberOfBombsPlaced < numberOfBombs) {
    // Will update this loop to not place bombs on top of of other bombs.
    let randomRowIndex = Math.floor(Math.random() * numberOfRows);
    let randomColIndex = Math.floor(Math.random() * numberOfColumns);
    board[randomRowIndex][randomColIndex] = 'B';
    numberOfBombsPlaced++;
  };

  return board;
};

// Prints the board to the console.
const printBoard = board => {
  console.log(board.map(row => row.join(' | ')).join('\n'));
};

// Testing to see if my code is working as I expect...it is!
let playerBoard = generatePlayerBoard(4, 3);
let bombBoard = generateBombBoard(3, 4, 5);
console.log('Player Board: ');
printBoard(playerBoard);
console.log('Bomb Board: ');
printBoard(bombBoard);
