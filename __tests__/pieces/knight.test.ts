import { Board, Knight } from '../../src/board';
import { PlayerColor } from '../../src/types';

describe('Knight Moves', () => {
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

  test('Knight should move in L-shape', () => {
    clearBoardExcept(4, 4);
    board.board[4][4] = new Knight(PlayerColor.WHITE);
    expect(board.getPiece(4, 4)?.isValidMove(4, 4, 2, 3, board)).toBe(true);
    expect(board.getPiece(4, 4)?.isValidMove(4, 4, 3, 2, board)).toBe(true);
    expect(board.getPiece(4, 4)?.isValidMove(4, 4, 6, 5, board)).toBe(true);
  });
});