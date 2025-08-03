import { Board } from "./board";

export enum PlayerColor {
  WHITE = 'white',
  BLACK = 'black',
}

export enum PieceType {
  PAWN = 'Pawn',
  ROOK = 'Rook',
  KNIGHT = 'Knight',
  BISHOP = 'Bishop',
  QUEEN = 'Queen',
  KING = 'King',
}

export interface Move {
  startRow: number;
  startCol: number;
  endRow: number;
  endCol: number;
  board: Board;
}