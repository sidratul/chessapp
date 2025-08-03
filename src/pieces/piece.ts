
import { PlayerColor, PieceType, Move } from '../types';

export abstract class Piece {
  color: PlayerColor;
  type: PieceType;
  symbol: string;

  constructor(color: PlayerColor, type: PieceType) {
    this.color = color;
    this.type = type;
    this.symbol = this.getSymbol();
  }

  getSymbol(): string {
    const symbols: { [key in PlayerColor]: { [key in PieceType]?: string } } = {
      [PlayerColor.WHITE]: {
        [PieceType.PAWN]: '♙', [PieceType.ROOK]: '♖', [PieceType.KNIGHT]: '♘', [PieceType.BISHOP]: '♗', [PieceType.QUEEN]: '♕', [PieceType.KING]: '♔'
      },
      [PlayerColor.BLACK]: {
        [PieceType.PAWN]: '♟', [PieceType.ROOK]: '♜', [PieceType.KNIGHT]: '♞', [PieceType.BISHOP]: '♝', [PieceType.QUEEN]: '♛', [PieceType.KING]: '♚'
      }
    };
    const rawSymbol = symbols[this.color][this.type];
    return rawSymbol || '';
  }

    abstract isValidMove(move: Move): boolean;
}
