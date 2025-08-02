import { Piece } from './piece';
import { PlayerColor, PieceType } from '../types';
import { Board } from '../board';

export class Pawn extends Piece {
  constructor(color: PlayerColor) {
    super(color, PieceType.PAWN);
  }

  isValidMove(startRow: number, startCol: number, endRow: number, endCol: number, board: Board): boolean {
    const direction = this.color === PlayerColor.WHITE ? -1 : 1;
    const startRank = this.color === PlayerColor.WHITE ? 6 : 1;

    // Move one square forward
    if (startCol === endCol && endRow === startRow + direction && !board.board[endRow][endCol]) {
      return true;
    }

    // Move two squares forward from starting position
    if (startCol === endCol && startRow === startRank && endRow === startRow + 2 * direction && !board.board[endRow][endCol] && !board.board[startRow + direction]![startCol]) {
      return true;
    }

    // Capture diagonally
    if (Math.abs(startCol - endCol) === 1 && endRow === startRow + direction && board.board[endRow][endCol] && board.board[endRow][endCol]!.color !== this.color) {
      return true;
    }

    return false;
  }
}
