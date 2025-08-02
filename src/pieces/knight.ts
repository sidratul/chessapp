import { Piece } from './piece';
import { PlayerColor, PieceType } from '../types';

export class Knight extends Piece {
  constructor(color: PlayerColor) {
    super(color, PieceType.KNIGHT);
  }

  isValidMove(startRow: number, startCol: number, endRow: number, endCol: number, board: import("../board").Board): boolean {
    const rowDiff = Math.abs(startRow - endRow);
    const colDiff = Math.abs(startCol - endCol);

    if ((rowDiff === 2 && colDiff === 1) || (rowDiff === 1 && colDiff === 2)) {
      const targetPiece = board.board[endRow][endCol];
      return !targetPiece || targetPiece.color !== this.color;
    }
    return false;
  }
}
