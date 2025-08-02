import { Board, Pawn } from '../../src/board';
import { PlayerColor } from '../../src/types';

describe('Pawn Moves', () => {
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
    board.board[6][0] = new Pawn(PlayerColor.WHITE);
    expect(board.getPiece(6, 0)?.isValidMove(6, 0, 5, 0, board)).toBe(true);
  });

  test('Pawn should move two steps forward from start', () => {
    clearBoardExcept(6, 0);
    board.board[6][0] = new Pawn(PlayerColor.WHITE);
    expect(board.getPiece(6, 0)?.isValidMove(6, 0, 4, 0, board)).toBe(true);
  });

  test('Pawn should capture diagonally', () => {
    clearBoardExcept(6, 0);
    board.board[6][0] = new Pawn(PlayerColor.WHITE);
    board.board[5][1] = new Pawn(PlayerColor.BLACK);
    expect(board.getPiece(6, 0)?.isValidMove(6, 0, 5, 1, board)).toBe(true);
  });
});