import { Board, Queen } from '../../src/board';
import { PlayerColor } from '../../src/types';

describe('Queen Moves', () => {
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

  test('Queen should move straight or diagonally', () => {
    clearBoardExcept(4, 4);
    board.board[4][4] = new Queen(PlayerColor.WHITE);
    // Straight
        expect(board.getPiece(4, 4)?.isValidMove({ startRow: 4, startCol: 4, endRow: 4, endCol: 0, board })).toBe(true);
    // Diagonal
    expect(board.getPiece(4, 4)?.isValidMove({ startRow: 4, startCol: 4, endRow: 0, endCol: 0, board })).toBe(true);
  });
});