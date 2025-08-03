import ChessGame from '../src/game';
import { Board, Queen } from '../src/board';
import { PlayerColor } from '../src/types';

describe('ChessGame', () => {
  let game: ChessGame;

  beforeEach(() => {
    game = new ChessGame();
  });

  test('should initialize with a new board and white as current player', () => {
    expect(game.board).toBeInstanceOf(Board);
    expect(game.currentPlayer).toBe(PlayerColor.WHITE);
  });

  test('should switch player after a valid move', () => {
    // Move white pawn from a2 to a3
        game.makeMove({ startRow: 6, startCol: 0, endRow: 5, endCol: 0 });
    expect(game.currentPlayer).toBe(PlayerColor.BLACK);
  });

  test('should not allow moving a piece of the wrong color', () => {
    // Try to move black pawn as white player
        expect(() => game.makeMove({ startRow: 1, startCol: 0, endRow: 2, endCol: 0 })).toThrow("It's white's turn.");
  });

  test('should not allow moving from an empty square', () => {
        expect(() => game.makeMove({ startRow: 4, startCol: 4, endRow: 3, endCol: 4 })).toThrow('No piece at starting position.');
  });

  test('should end the game when a king is captured', () => {
    // Ensure black king is at 0,4 (default board setup)
    // Clear path for white queen to capture black king
    game.board.board[1][4] = null; // Remove black pawn
    game.board.board[2][4] = null; // Clear square
    game.board.board[3][4] = null; // Clear square

    // Place a white queen at 3,4
    game.board.board[3][4] = new Queen(PlayerColor.WHITE);

    // Move white queen to capture black king
        game.makeMove({ startRow: 3, startCol: 4, endRow: 0, endCol: 4 });
    expect(game.isGameOver()).toBe(true);
    expect(game.winner).toBe(PlayerColor.WHITE);
  });
});