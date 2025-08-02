import { Board, Rook } from '../../src/board';
import { PlayerColor } from '../../src/types';

describe('Rook Moves', () => {
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

  test('Rook should move horizontally', () => {
    clearBoardExcept(4, 4);
    board.board[4][4] = new Rook(PlayerColor.WHITE);
    expect(board.getPiece(4, 4)?.isValidMove(4, 4, 4, 0, board)).toBe(true);
    expect(board.getPiece(4, 4)?.isValidMove(4, 4, 4, 7, board)).toBe(true);
  });

  test('Rook should move vertically', () => {
    clearBoardExcept(4, 4);
    board.board[4][4] = new Rook(PlayerColor.WHITE);
    expect(board.getPiece(4, 4)?.isValidMove(4, 4, 0, 4, board)).toBe(true);
    expect(board.getPiece(4, 4)?.isValidMove(4, 4, 7, 4, board)).toBe(true);
  });
});