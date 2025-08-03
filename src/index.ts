import ChessGame from './game';
import readline from 'readline';
import { PlayerColor } from './types';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const game = new ChessGame();

function displayBoard(): void {
  console.log('\n' + game.board.toString());
}

function getPlayerMove(): void {
  const promptText = `Player ${game.currentPlayer}'s turn. Enter your move (e.g., b2,b3): `;
  rl.question(promptText, (input: string) => {
    try {
      const parts = input.split(',');
      if (parts.length !== 2) {
        throw new Error('Invalid input format. Please use "start,end" (e.g., b2,b3).');
      }
      const [start, end] = parts;
      const startCoords = game.board.parseCoordinate(start.trim());
      const endCoords = game.board.parseCoordinate(end.trim());

      game.makeMove(startCoords.row, startCoords.col, endCoords.row, endCoords.col);
      displayBoard();

      if (game.isGameOver()) {
        console.log(`Game Over! Player ${game.winner} wins!`);
        rl.close();
      } else {
        if (game.isKingInCheck(game.currentPlayer)) {
          console.log(`Check! Player ${game.currentPlayer}'s King is in check!`);
        }
        getPlayerMove();
      }
    } catch (error: any) {
      console.error(`Invalid move: ${error.message}`);
      displayBoard();
      getPlayerMove();
    }
  });
}

function displayLegend(): void {
  console.log('\nChess Piece Legend:');
  console.log('White Pieces:');
  console.log('  Pawn: ♙');
  console.log('  Rook: ♖');
  console.log('  Knight: ♘');
  console.log('  Bishop: ♗');
  console.log('  Queen: ♕');
  console.log('  King: ♔');
  console.log('Black Pieces:');
  console.log('  Pawn: ♟');
  console.log('  Rook: ♜');
  console.log('  Knight: ♞');
  console.log('  Bishop: ♝');
  console.log('  Queen: ♛');
  console.log('  King: ♚');
}

console.log('Welcome to CLI Chess!');
displayLegend();
displayBoard();
getPlayerMove();
