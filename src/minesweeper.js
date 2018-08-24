// This class creates a new game of minesweeper when instantiated.
class Game {
  constructor(numberOfRows, numberOfColumns, numberOfBombs) {
    this._board = new Board(numberOfRows, numberOfColumns, numberOfBombs);
  }

  // This method takes a users tile pick and informs them of the outcome of their pick.
  playMove(rowIndex, columnIndex) {
    this._board.flipTile(rowIndex, columnIndex);
    if (this._board.playerBoard[rowIndex][columnIndex] === 'B') {
      console.log(`BOOOM! You stepped on a bomb. Game over!`);
      this._board.print();
    } else if (!this._board.hasSafeTiles()) {
      console.log(`WOW! You've safely tip-toe'd your way to victory. You win with all appendages intact!`);
    } else {
      console.log(`Current Board:`);
      console.log(`Whew, you're still alive. Choose another square to sweep for bombs...careful!`)
      this._board.print();
    }
  }
}

// This class creates a new board when instantiated and has the methods needed to play minesweeper built into it.
class Board {
  constructor(numberOfRows, numberOfColumns, numberOfBombs) {
    this._numberOfBombs = numberOfBombs;
    this._numberOfTiles = numberOfRows * numberOfColumns;
    this._playerBoard = Board.generatePlayerBoard(numberOfRows, numberOfBombs);
    this._bombBoard = Board.generateBombBoard(numberOfRows, numberOfColumns, numberOfBombs);
  }

  // This method returns the current player board.
  get playerBoard() {
    return this._playerBoard;
  }

  // This method allows a user to flip a tile and then updates that tiles status.
  flipTile(rowIndex, columnIndex) {
    if (this._playerBoard[rowIndex][columnIndex] !== ' ') {
      console.log('This tile has already been flipped!');
      return;
    } else if (this._bombBoard[rowIndex][columnIndex] === 'B') {
      this._playerBoard[rowIndex][columnIndex] = 'B';
    } else {
      this._playerBoard[rowIndex][columnIndex] = this.getNumberOfNeighborBombs(rowIndex, columnIndex);
    }
    this._numberOfTiles--;
  }

  // This method returns how many bombs neighbor any given square on the board.
  getNumberOfNeighborBombs(rowIndex, columnIndex) {
    const neighborOffsets = [
      [-1, -1],
      [-1, 0],
      [-1, 1],
      [0, -1],
      [0, 1],
      [1, -1],
      [1, 0],
      [1, 1]
    ];
    const numberOfRows = this._bombBoard.length;
    const numberOfColumns = this._bombBoard[0].length;
    let numberOfBombs = 0;

    neighborOffsets.forEach(offset => {
      const neighborRowIndex = rowIndex + offset[0];
      const neighborColumnIndex = columnIndex + offset[1];

      if (neighborRowIndex >= 0 && neighborRowIndex < numberOfRows && neighborColumnIndex >= 0 && neighborColumnIndex < numberOfColumns) {
        if (this._bombBoard[neighborRowIndex][neighborColumnIndex] === 'B') {
          numberOfBombs++;
        }
      }
    });

    return numberOfBombs;
  }

  // This method checks to see if there are any tiles remaining to be flipped and returns a boolean.
  hasSafeTiles() {
    return this._numberOfTiles !== this._numberOfBombs;
  }

  // This method prints the board to the console for the player to see.
  print() {
    console.log(this._playerBoard.map(row => row.join(' | ')).join('\n'));
  }

  // This method generates the player's board.
  static generatePlayerBoard(numberOfRows, numberOfColumns) {
    const board = [];

    for (let rowIndex = 0; rowIndex < numberOfRows; rowIndex++) {
      const row = [];
      for (let columnIndex = 0; columnIndex <= numberOfColumns; columnIndex++) {
        row.push(' ');
      }
      board.push(row);
    }
    return board;
  }

  // This method generates the board that stores the bomb layout.
  static generateBombBoard(numberOfRows, numberOfColumns, numberOfBombs) {
    const board = [];

    for (let rowIndex = 0; rowIndex < numberOfRows; rowIndex++) {
      const row = [];
      for (let columnIndex = 0; columnIndex < numberOfColumns; columnIndex++) {
        row.push(null);
      }
      board.push(row);
    }

    let numberOfBombsPlaced = 0;

    // This loop randomly places bombs on the board.
    while (numberOfBombsPlaced < numberOfBombs) {
      // Will update this loop to not place bombs on top of of other bombs.
      const randomRowIndex = Math.floor(Math.random() * numberOfRows);
      const randomColIndex = Math.floor(Math.random() * numberOfColumns);

      if (board[randomRowIndex][randomColIndex] !== 'B') {
        board[randomRowIndex][randomColIndex] = 'B';
        numberOfBombsPlaced++;
      }
    }

    return board;
  }
}

// Testing to see if my code is working as I expect...it is!
const g = new Game(3, 3, 3);
g.playMove(1, 2);
