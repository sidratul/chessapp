

import 'colors';

export class Piece {
  color: string;
  type: string;
  symbol: string;

  constructor(color: string, type: string) {
    this.color = color;
    this.type = type;
    this.symbol = this.getSymbol();
  }

  getSymbol(): string {
    const symbols: { [key: string]: { [key: string]: string } } = {
      'white': {
        'Pawn': '♙', 'Rook': '♖', 'Knight': '♘', 'Bishop': '♗', 'Queen': '♕', 'King': '♔'
      },
      'black': {
        'Pawn': '♟', 'Rook': '♜', 'Knight': '♞', 'Bishop': '♝', 'Queen': '♛', 'King': '♚'
      }
    };
    const rawSymbol = symbols[this.color][this.type];
    return rawSymbol;
  }

  isValidMove(startRow: number, startCol: number, endRow: number, endCol: number, board: (Piece | null)[][]): boolean {
    throw new Error('isValidMove method must be implemented by subclasses');
  }
}

export class Pawn extends Piece {
  constructor(color: string) {
    super(color, 'Pawn');
  }

  isValidMove(startRow: number, startCol: number, endRow: number, endCol: number, board: (Piece | null)[][]): boolean {
    const direction = this.color === 'white' ? -1 : 1;
    const startRank = this.color === 'white' ? 6 : 1;

    // Move one square forward
    if (startCol === endCol && endRow === startRow + direction && !board[endRow][endCol]) {
      return true;
    }

    // Move two squares forward from starting position
    if (startCol === endCol && startRow === startRank && endRow === startRow + 2 * direction && !board[endRow][endCol] && !board[startRow + direction]![startCol]) {
      return true;
    }

    // Capture diagonally
    if (Math.abs(startCol - endCol) === 1 && endRow === startRow + direction && board[endRow][endCol] && board[endRow][endCol]!.color !== this.color) {
      return true;
    }

    return false;
  }
}

export class Rook extends Piece {
  constructor(color: string) {
    super(color, 'Rook');
  }

  isValidMove(startRow: number, startCol: number, endRow: number, endCol: number, board: (Piece | null)[][]): boolean {
    if (startRow === endRow) { // Horizontal move
      const step = startCol < endCol ? 1 : -1;
      for (let col = startCol + step; col !== endCol; col += step) {
        if (board[startRow][col]) return false;
      }
    } else if (startCol === endCol) { // Vertical move
      const step = startRow < endRow ? 1 : -1;
      for (let row = startRow + step; row !== endRow; row += step) {
        if (board[row][startCol]) return false;
      }
    } else {
      return false; // Not a straight line
    }

    const targetPiece = board[endRow][endCol];
    return !targetPiece || targetPiece.color !== this.color;
  }
}

export class Knight extends Piece {
  constructor(color: string) {
    super(color, 'Knight');
  }

  isValidMove(startRow: number, startCol: number, endRow: number, endCol: number, board: (Piece | null)[][]): boolean {
    const rowDiff = Math.abs(startRow - endRow);
    const colDiff = Math.abs(startCol - endCol);

    if ((rowDiff === 2 && colDiff === 1) || (rowDiff === 1 && colDiff === 2)) {
      const targetPiece = board[endRow][endCol];
      return !targetPiece || targetPiece.color !== this.color;
    }
    return false;
  }
}

export class Bishop extends Piece {
  constructor(color: string) {
    super(color, 'Bishop');
  }

  isValidMove(startRow: number, startCol: number, endRow: number, endCol: number, board: (Piece | null)[][]): boolean {
    if (Math.abs(startRow - endRow) !== Math.abs(startCol - endCol)) {
      return false; // Not a diagonal move
    }

    const rowStep = startRow < endRow ? 1 : -1;
    const colStep = startCol < endCol ? 1 : -1;

    let r = startRow + rowStep;
    let c = startCol + colStep;
    while (r !== endRow && c !== endCol) {
      if (board[r][c]) return false; // Path is blocked
      r += rowStep;
      c += colStep;
    }

    const targetPiece = board[endRow][endCol];
    return !targetPiece || targetPiece.color !== this.color;
  }
}

export class Queen extends Piece {
  constructor(color: string) {
    super(color, 'Queen');
  }

  isValidMove(startRow: number, startCol: number, endRow: number, endCol: number, board: (Piece | null)[][]): boolean {
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

export class King extends Piece {
  constructor(color: string) {
    super(color, 'King');
  }

  isValidMove(startRow: number, startCol: number, endRow: number, endCol: number, board: (Piece | null)[][]): boolean {
    const rowDiff = Math.abs(startRow - endRow);
    const colDiff = Math.abs(startCol - endCol);

    if (rowDiff <= 1 && colDiff <= 1) {
      const targetPiece = board[endRow][endCol];
      return !targetPiece || targetPiece.color !== this.color;
    }
    return false;
  }
}

export class Board {
  board: (Piece | null)[][];

  constructor() {
    this.board = Array(8).fill(null).map(() => Array(8).fill(null));
    this.initializeBoard();
  }

  initializeBoard() {
    // Pawns
    for (let i = 0; i < 8; i++) {
      this.board[1][i] = new Pawn('black');
      this.board[6][i] = new Pawn('white');
    }

    // Rooks
    this.board[0][0] = new Rook('black');
    this.board[0][7] = new Rook('black');
    this.board[7][0] = new Rook('white');
    this.board[7][7] = new Rook('white');

    // Knights
    this.board[0][1] = new Knight('black');
    this.board[0][6] = new Knight('black');
    this.board[7][1] = new Knight('white');
    this.board[7][6] = new Knight('white');

    // Bishops
    this.board[0][2] = new Bishop('black');
    this.board[0][5] = new Bishop('black');
    this.board[7][2] = new Bishop('white');
    this.board[7][5] = new Bishop('white');

    // Queens
    this.board[0][3] = new Queen('black');
    this.board[7][3] = new Queen('white');

    // Kings
    this.board[0][4] = new King('black');
    this.board[7][4] = new King('white');
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
    let boardString = '  ';
    for (let i = 0; i < 8; i++) {
      boardString += String.fromCharCode(97 + i) + ' ';
    }
    boardString += '\n';
    boardString += ' +-----------------+\n';
    for (let i = 0; i < 8; i++) {
      boardString += `${8 - i}|`;
      for (let j = 0; j < 8; j++) {
        const piece = this.board[i][j];
        boardString += (piece ? (piece.color === 'white' ? piece.symbol.white : piece.symbol.black) : ' ') + ' ';
      }
      boardString += `|${8 - i}\n`;
    }
    boardString += ' +-----------------+\n';
    boardString += '  ';
    for (let i = 0; i < 8; i++) {
      boardString += String.fromCharCode(97 + i) + ' ';
    }
    return boardString;
  }

  parseCoordinate(coord: string): { row: number, col: number } {
    let col: number, row: number;

    if (coord.length === 2) {
      // Handle "a1" format
      if (/[a-h]/.test(coord[0])) {
        col = coord[0].charCodeAt(0) - 'a'.charCodeAt(0);
        row = 8 - parseInt(coord[1], 10);
      } else {
        throw new Error('Invalid coordinate format. Expected e.g., "a1" or "1,3".');
      }
    } else if (coord.includes(',')) {
      // Handle "1,3" format
      const parts = coord.split(',');
      if (parts.length !== 2) {
        throw new Error('Invalid coordinate format. Expected e.g., "a1" or "1,3".');
      }
      row = parseInt(parts[0], 10);
      col = parseInt(parts[1], 10);
      if (isNaN(row) || isNaN(col)) {
        throw new Error('Invalid coordinate format. Expected e.g., "a1" or "1,3".');
      }
    } else {
      throw new Error('Invalid coordinate format. Expected e.g., "a1" or "1,3".');
    }

    if (isNaN(row) || isNaN(col) || row < 0 || row >= 8 || col < 0 || col >= 8) {
      throw new Error('Coordinates out of board bounds.');
    }

    return { row, col };
  }
}