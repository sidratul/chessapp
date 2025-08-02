import ChessGame from '../src/game';
import { Board, Piece, Pawn, Rook, Knight, Bishop, Queen, King } from '../src/board';

describe('ChessGame', () => {
  let game: ChessGame;

  beforeEach(() => {
    game = new ChessGame();
  });

  test('should initialize with a new board and white as current player', () => {
    expect(game.board).toBeInstanceOf(Board);
    expect(game.currentPlayer).toBe('white');
  });

  test('should switch player after a valid move', () => {
    // Move white pawn from a2 to a3
    game.makeMove(6, 0, 5, 0);
    expect(game.currentPlayer).toBe('black');
  });

  test('should not allow moving a piece of the wrong color', () => {
    // Try to move black pawn as white player
    expect(() => game.makeMove(1, 0, 2, 0)).toThrow("It's white's turn.");
  });

  test('should not allow moving from an empty square', () => {
    expect(() => game.makeMove(4, 4, 3, 4)).toThrow('No piece at starting position.');
  });

  test('should end the game when a king is captured', () => {
    // Ensure black king is at 0,4 (default board setup)
    // Clear path for white queen to capture black king
    game.board.board[1][4] = null; // Remove black pawn
    game.board.board[2][4] = null; // Clear square
    game.board.board[3][4] = null; // Clear square

    // Place a white queen at 3,4
    game.board.board[3][4] = new Queen('white');

    // Move white queen to capture black king
    game.makeMove(3, 4, 0, 4);
    expect(game.isGameOver()).toBe(true);
    expect(game.winner).toBe('white');
  });
});

describe('Board', () => {
  let board: Board;

  beforeEach(() => {
    board = new Board();
  });

  test('should initialize with all pieces in correct positions', () => {
    // Test a few specific pieces
    expect(board.getPiece(0, 0)?.type).toBe('Rook');
    expect(board.getPiece(0, 0)?.color).toBe('black');
    expect(board.getPiece(1, 0)?.type).toBe('Pawn');
    expect(board.getPiece(1, 0)?.color).toBe('black');
    expect(board.getPiece(7, 4)?.type).toBe('King');
    expect(board.getPiece(7, 4)?.color).toBe('white');
  });

  test('should move a piece from start to end position', () => {
    const initialPiece = board.getPiece(6, 0); // White pawn
    board.movePiece(6, 0, 5, 0);
    expect(board.getPiece(5, 0)).toBe(initialPiece);
    expect(board.getPiece(6, 0)).toBeNull();
  });

  test('should return null for out of bounds piece access', () => {
    expect(board.getPiece(-1, 0)).toBeNull();
    expect(board.getPiece(8, 0)).toBeNull();
  });

  test('parseCoordinate should correctly parse algebraic notation', () => {
    const { row, col } = board.parseCoordinate('a1');
    expect(row).toBe(7);
    expect(col).toBe(0);
  });

  test('parseCoordinate should correctly parse row,col notation', () => {
    const { row, col } = board.parseCoordinate('0,0');
    expect(row).toBe(0);
    expect(col).toBe(0);
  });

  test('parseCoordinate should throw error for invalid format', () => {
    expect(() => board.parseCoordinate('a')).toThrow('Invalid coordinate format.');
    expect(() => board.parseCoordinate('abc')).toThrow('Invalid coordinate format.');
  });

  test('parseCoordinate should throw error for out of bounds coordinates', () => {
    expect(() => board.parseCoordinate('a9')).toThrow('Coordinates out of board bounds.');
    expect(() => board.parseCoordinate('9,0')).toThrow('Coordinates out of board bounds.');
  });

  test('parseCoordinate should correctly parse algebraic notation with comma', () => {
    const { row, col } = board.parseCoordinate('a1');
    expect(row).toBe(7);
    expect(col).toBe(0);
  });

  test('parseCoordinate should correctly parse row,col notation with comma', () => {
    const { row, col } = board.parseCoordinate('0,0');
    expect(row).toBe(0);
    expect(col).toBe(0);
  });

  test('parseCoordinate should throw error for invalid format with comma', () => {
    expect(() => board.parseCoordinate('a')).toThrow('Invalid coordinate format.');
    expect(() => board.parseCoordinate('abc')).toThrow('Invalid coordinate format.');
    expect(() => board.parseCoordinate('a,b')).toThrow('Invalid coordinate format.');
  });

  test('parseCoordinate should throw error for out of bounds coordinates with comma', () => {
    expect(() => board.parseCoordinate('a9')).toThrow('Coordinates out of board bounds.');
    expect(() => board.parseCoordinate('9,0')).toThrow('Coordinates out of board bounds.');
  });
});

describe('Piece Moves', () => {
  let board: Board;

  beforeEach(() => {
    board = new Board();
  });

  // Helper to clear board for specific piece testing
  function clearBoardExcept(row: number, col: number) {
    for (let r = 0; r < 8; r++) {
      for (let c = 0; c < 8; c++) {
        if (r !== row || c !== col) {
          board.board[r][c] = null;
        }
      }
    }
  }

  test('Pawn should move one step forward', () => {
    clearBoardExcept(6, 0);
    board.board[6][0] = new Pawn('white');
    expect(board.getPiece(6, 0)?.isValidMove(6, 0, 5, 0, board)).toBe(true);
  });

  test('Pawn should move two steps forward from start', () => {
    clearBoardExcept(6, 0);
    board.board[6][0] = new Pawn('white');
    expect(board.getPiece(6, 0)?.isValidMove(6, 0, 4, 0, board)).toBe(true);
  });

  test('Pawn should capture diagonally', () => {
    clearBoardExcept(6, 0);
    board.board[6][0] = new Pawn('white');
    board.board[5][1] = new Pawn('black');
    expect(board.getPiece(6, 0)?.isValidMove(6, 0, 5, 1, board)).toBe(true);
  });

  test('Rook should move horizontally', () => {
    clearBoardExcept(4, 4);
    board.board[4][4] = new Rook('white');
    expect(board.getPiece(4, 4)?.isValidMove(4, 4, 4, 0, board)).toBe(true);
    expect(board.getPiece(4, 4)?.isValidMove(4, 4, 4, 7, board)).toBe(true);
  });

  test('Rook should move vertically', () => {
    clearBoardExcept(4, 4);
    board.board[4][4] = new Rook('white');
    expect(board.getPiece(4, 4)?.isValidMove(4, 4, 0, 4, board)).toBe(true);
    expect(board.getPiece(4, 4)?.isValidMove(4, 4, 7, 4, board)).toBe(true);
  });

  test('Knight should move in L-shape', () => {
    clearBoardExcept(4, 4);
    board.board[4][4] = new Knight('white');
    expect(board.getPiece(4, 4)?.isValidMove(4, 4, 2, 3, board)).toBe(true);
    expect(board.getPiece(4, 4)?.isValidMove(4, 4, 3, 2, board)).toBe(true);
    expect(board.getPiece(4, 4)?.isValidMove(4, 4, 6, 5, board)).toBe(true);
  });

  test('Bishop should move diagonally', () => {
    clearBoardExcept(4, 4);
    board.board[4][4] = new Bishop('white');
    expect(board.getPiece(4, 4)?.isValidMove(4, 4, 0, 0, board)).toBe(true);
    expect(board.getPiece(4, 4)?.isValidMove(4, 4, 7, 7, board)).toBe(true);
  });

  test('Queen should move straight or diagonally', () => {
    clearBoardExcept(4, 4);
    board.board[4][4] = new Queen('white');
    // Straight
    expect(board.getPiece(4, 4)?.isValidMove(4, 4, 4, 0, board)).toBe(true);
    // Diagonal
    expect(board.getPiece(4, 4)?.isValidMove(4, 4, 0, 0, board)).toBe(true);
  });

  test('King should move one step in any direction', () => {
    clearBoardExcept(4, 4);
    board.board[4][4] = new King('white');
    expect(board.getPiece(4, 4)?.isValidMove(4, 4, 3, 4, board)).toBe(true);
    expect(board.getPiece(4, 4)?.isValidMove(4, 4, 5, 5, board)).toBe(true);
  });
});
