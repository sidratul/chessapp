import { Board, Piece } from './board.js';

export default class ChessGame {
  board: Board;
  currentPlayer: string;
  winner: string | null;

  constructor() {
    this.board = new Board();
    this.currentPlayer = 'white';
    this.winner = null;
  }

  makeMove(startRow: number, startCol: number, endRow: number, endCol: number): void {
    const piece = this.board.getPiece(startRow, startCol);

    if (!piece) {
      throw new Error('No piece at starting position.');
    }

    if (piece.color !== this.currentPlayer) {
      throw new Error(`It's ${this.currentPlayer}'s turn.`);
    }

    if (!piece.isValidMove(startRow, startCol, endRow, endCol, this.board.board)) {
      throw new Error('Invalid move for this piece.');
    }

    const capturedPiece = this.board.movePiece(startRow, startCol, endRow, endCol);

    if (capturedPiece && capturedPiece.type === 'King') {
      this.winner = this.currentPlayer;
      return; // End game immediately after king capture
    }

    this.switchPlayer();
  }

  switchPlayer(): void {
    this.currentPlayer = this.currentPlayer === 'white' ? 'black' : 'white';
  }

  isGameOver(): boolean {
    return !!this.winner;
  }
}