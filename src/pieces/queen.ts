import { Piece } from './piece';
import { Rook } from './rook';
import { Bishop } from './bishop';
import { PlayerColor, PieceType } from '../types';
import { Board } from '../board';

export class Queen extends Piece {
  constructor(color: PlayerColor) {
    super(color, PieceType.QUEEN);
  }

  isValidMove(startRow: number, startCol: number, endRow: number, endCol: number, board: Board): boolean {
    // Queen combines Rook and Bishop moves
    const isStraight = startRow === endRow || startCol === endCol;
    const isDiagonal = Math.abs(startRow - endRow) === Math.abs(startCol - endCol);

    if (!isStraight && !isDiagonal) {
      return false;
    }

    if (isStraight) {
      const rook = new Rook(this.color); // Use Rook's logic for straight moves
      return rook.isValidMove(startRow, startCol, endRow, endCol, board);
    } else { // isDiagonal
      const bishop = new Bishop(this.color); // Use Bishop's logic for diagonal moves
      return bishop.isValidMove(startRow, startCol, endRow, endCol, board);
    }
  }
}
