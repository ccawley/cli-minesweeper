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

// Generates the board that stores the bomb layout.
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

    if (board[randomRowIndex][randomColIndex] !== 'B') {
      board[randomRowIndex][randomColIndex] = 'B';
      numberOfBombsPlaced++;
    };
  };

  return board;
};

// This function returns how many bombs neighbor any given square on the board.
const getNumberOfNeighborBombs = (bombBoard, rowIndex, colIndex) => {
  const neighborOffsets = [[-1, -1],[-1, 0],[-1, 1],[0, -1],[0, 1],[1, -1],[1, 0],[1, 1]];
  const numberOfRows = bombBoard.length;
  const numberOfColumns = bombBoard[0].length;
  let numberOfBombs = 0;

  neighborOffsets.forEach(offset => {
    const neighborRowIndex = rowIndex + offset[0];
    const neighborColumnIndex = colIndex + offset[1];

    if (neighborRowIndex >= 0 && neighborRowIndex < numberOfRows && neighborColumnIndex >= 0 && neighborColumnIndex < numberOfColumns) {
      if (bombBoard[neighborRowIndex][neighborColumnIndex] === 'B') {
        numberOfBombs++;
      };
    };

  });
  return numberOfBombs;
};

// This function allows a user to flip a tile and then update that tile.
const flipTile = (playerBoard, bombBoard, rowIndex, colIndex) => {
  if (playerBoard[rowIndex][colIndex] !== ' ') {
    console.log('This tile has already been flipped!');
    return;
  } else if (bombBoard[rowIndex][colIndex] === 'B') {
    playerBoard[rowIndex][colIndex] = 'B';
  } else {
    playerBoard[rowIndex][colIndex] = getNumberOfNeighborBombs(bombBoard, rowIndex, colIndex);
  };
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
flipTile(playerBoard, bombBoard, 0, 0);
console.log('Updated Player Board:');
printBoard(playerBoard);
