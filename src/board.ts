export * from './pieces/piece';
export * from './pieces/pawn';
export * from './pieces/rook';
export * from './pieces/knight';
export * from './pieces/bishop';
export * from './pieces/queen';
export * from './pieces/king';

import { Piece } from './pieces/piece';
import { Pawn } from './pieces/pawn';
import { Rook } from './pieces/rook';
import { Knight } from './pieces/knight';
import { Bishop } from './pieces/bishop';
import { Queen } from './pieces/queen';
import { King } from './pieces/king';
import { PlayerColor } from './types';

export class Board {
  board: (Piece | null)[][];

  constructor() {
    this.board = Array(8).fill(null).map(() => Array(8).fill(null));
    this.initializeBoard();
  }

  initializeBoard() {
    // Pawns
    for (let i = 0; i < 8; i++) {
      this.board[1][i] = new Pawn(PlayerColor.BLACK);
      this.board[6][i] = new Pawn(PlayerColor.WHITE);
    }

    // Rooks
    this.board[0][0] = new Rook(PlayerColor.BLACK);
    this.board[0][7] = new Rook(PlayerColor.BLACK);
    this.board[7][0] = new Rook(PlayerColor.WHITE);
    this.board[7][7] = new Rook(PlayerColor.WHITE);

    // Knights
    this.board[0][1] = new Knight(PlayerColor.BLACK);
    this.board[0][6] = new Knight(PlayerColor.BLACK);
    this.board[7][1] = new Knight(PlayerColor.WHITE);
    this.board[7][6] = new Knight(PlayerColor.WHITE);

    // Bishops
    this.board[0][2] = new Bishop(PlayerColor.BLACK);
    this.board[0][5] = new Bishop(PlayerColor.BLACK);
    this.board[7][2] = new Bishop(PlayerColor.WHITE);
    this.board[7][5] = new Bishop(PlayerColor.WHITE);

    // Queens
    this.board[0][3] = new Queen(PlayerColor.BLACK);
    this.board[7][3] = new Queen(PlayerColor.WHITE);

    // Kings
    this.board[0][4] = new King(PlayerColor.BLACK);
    this.board[7][4] = new King(PlayerColor.WHITE);
  }

  getPiece(row: number, col: number): Piece | null {
    if (row < 0 || row >= 8 || col < 0 || col >= 8) {
      return null;
    }
    return this.board[row][col];
  }

  movePiece(startRow: number, startCol: number, endRow: number, endCol: number): Piece | null {
    const pieceToMove = this.board[startRow][startCol];
    const capturedPiece = this.board[endRow][endCol];

    this.board[endRow][endCol] = pieceToMove;
    this.board[startRow][startCol] = null;
    return capturedPiece;
  }

  toString(): string {
    let boardString = '';
    const columnLabels = 'a b c d e f g h ';
    boardString += '  ' + columnLabels + '\n';
    boardString += ' +-----------------+\n';
    for (let i = 0; i < 8; i++) {
      boardString += `${8 - i}|`;
      for (let j = 0; j < 8; j++) {
        const piece = this.board[i][j];
        boardString += (piece ? piece.symbol  : ' ') + ' ';
      }
      boardString += `|${8 - i}\n`;
    }
    boardString += ' +-----------------+\n';
    boardString += '  ' + columnLabels;
    return boardString;
  }

  parseCoordinate(coord: string): { row: number, col: number } {
    let col: number, row: number;

    if (coord.length === 2) {
      if (/[a-h]/.test(coord[0])) {
        col = coord[0].charCodeAt(0) - 'a'.charCodeAt(0);
        row = 8 - parseInt(coord[1], 10);
      } else {
        throw new Error('Invalid coordinate format. Expected e.g., "a1".');
      }
    } else {
      throw new Error('Invalid coordinate format. Expected e.g., "a1".');
    }

    if (isNaN(row) || isNaN(col) || row < 0 || row >= 8 || col < 0 || col >= 8) {
      throw new Error('Coordinates out of board bounds.');
    }

    return { row, col };
  }
}