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
        expect(board.getPiece(4, 4)?.isValidMove({ startRow: 4, startCol: 4, endRow: 2, endCol: 3, board })).toBe(true);
    expect(board.getPiece(4, 4)?.isValidMove({ startRow: 4, startCol: 4, endRow: 3, endCol: 2, board })).toBe(true);
    expect(board.getPiece(4, 4)?.isValidMove({ startRow: 4, startCol: 4, endRow: 6, endCol: 5, board })).toBe(true);
  });
});