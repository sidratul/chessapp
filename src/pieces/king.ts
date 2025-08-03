import { Piece } from './piece';
import { PlayerColor, PieceType, Move } from '../types';

export class King extends Piece {
  constructor(color: PlayerColor) {
    super(color, PieceType.KING);
  }

  isValidMove({ startRow, startCol, endRow, endCol, board }: Move): boolean {
    const rowDiff = Math.abs(startRow - endRow);
    const colDiff = Math.abs(startCol - endCol);

    if (rowDiff <= 1 && colDiff <= 1) {
      const targetPiece = board.board[endRow][endCol];
      return !targetPiece || targetPiece.color !== this.color;
    }
    return false;
  }
}
