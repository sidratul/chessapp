import { Piece } from './piece';
import { PlayerColor, PieceType, Move } from '../types';

export class Rook extends Piece {
  constructor(color: PlayerColor) {
    super(color, PieceType.ROOK);
  }

  isValidMove({ startRow, startCol, endRow, endCol, board }: Move): boolean {
    if (startRow === endRow) { // Horizontal move
      const step = startCol < endCol ? 1 : -1;
      for (let col = startCol + step; col !== endCol; col += step) {
        if (board.board[startRow][col]) return false;
      }
    } else if (startCol === endCol) { // Vertical move
      const step = startRow < endRow ? 1 : -1;
      for (let row = startRow + step; row !== endRow; row += step) {
        if (board.board[row][startCol]) return false;
      }
    } else {
      return false; // Not a straight line
    }

    const targetPiece = board.board[endRow][endCol];
    return !targetPiece || targetPiece.color !== this.color;
  }
}
