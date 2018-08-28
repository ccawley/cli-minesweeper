// To play Minesweeper, we will create instances of MineSweeperGame in command line.
// For example:
// In the command line, navigate to the src directory and run `node`
// Run `.load game.js` to load the contents of this file.
// Then create a Game instance and run commands like so:
// let game = new Game(3, 3, 3);
// game.playMove(0, 1);
// game.playMove(1, 2);
// When done run `.exit`

import { Board } from './board';

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
