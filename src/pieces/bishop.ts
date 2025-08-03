import { Piece } from './piece';
import { PlayerColor, PieceType, Move } from '../types';

export class Bishop extends Piece {
  constructor(color: PlayerColor) {
    super(color, PieceType.BISHOP);
  }

  isValidMove({ startRow, startCol, endRow, endCol, board }: Move): boolean {
    if (Math.abs(startRow - endRow) !== Math.abs(startCol - endCol)) {
      return false; // Not a diagonal move
    }

    const rowStep = startRow < endRow ? 1 : -1;
    const colStep = startCol < endCol ? 1 : -1;

    let r = startRow + rowStep;
    let c = startCol + colStep;
    while (r !== endRow && c !== endCol) {
      if (board.board[r][c]) return false; // Path is blocked
      r += rowStep;
      c += colStep;
    }

    const targetPiece = board.board[endRow][endCol];
    return !targetPiece || targetPiece.color !== this.color;
  }
}
