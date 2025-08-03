import { Board } from './board';

import { PlayerColor, PieceType, MoveCommand } from './types';

export default class ChessGame {
  board: Board;
  currentPlayer: PlayerColor;
  winner: PlayerColor | null;

  constructor() {
    this.board = new Board();
    this.currentPlayer = PlayerColor.WHITE;
    this.winner = null;
  }

    makeMove({ startRow, startCol, endRow, endCol }: MoveCommand): void {
    const piece = this.board.getPiece(startRow, startCol);

    if (!piece) {
      throw new Error('No piece at starting position.');
    }

    if (piece.color !== this.currentPlayer) {
      throw new Error(`It's ${this.currentPlayer}'s turn.`);
    }

        if (!piece.isValidMove({ startRow, startCol, endRow, endCol, board: this.board })) {
      throw new Error('Invalid move for this piece.');
    }

    const capturedPiece = this.board.movePiece(startRow, startCol, endRow, endCol);

    if (capturedPiece && capturedPiece.type === PieceType.KING) {
      this.winner = this.currentPlayer;
      return; // End game immediately after king capture
    }

    this.switchPlayer();
  }

  isKingInCheck(playerColor: PlayerColor): boolean {
    let kingRow: number = -1;
    let kingCol: number = -1;

    // Find the king's position
    for (let r = 0; r < 8; r++) {
      for (let c = 0; c < 8; c++) {
        const piece = this.board.getPiece(r, c);
        if (piece && piece.type === PieceType.KING && piece.color === playerColor) {
          kingRow = r;
          kingCol = c;
          break;
        }
      }
      if (kingRow !== -1) break;
    }

    if (kingRow === -1) return false; // Should not happen in a valid game

    const opponentColor = playerColor === PlayerColor.WHITE ? PlayerColor.BLACK : PlayerColor.WHITE;

    // Check if any opponent's piece can attack the king
    for (let r = 0; r < 8; r++) {
      for (let c = 0; c < 8; c++) {
        const piece = this.board.getPiece(r, c);
        if (piece && piece.color === opponentColor) {
          // Temporarily set the king's position to null to avoid self-blocking issues
          // for pieces like Rook, Bishop, Queen when checking for attacks.
          // This is a simplified check and might need refinement for complex scenarios
          // like discovered checks or pins, but covers basic direct attacks.
          const originalKingPiece = this.board.board[kingRow][kingCol];
          this.board.board[kingRow][kingCol] = null; 

                    const canAttackKing = piece.isValidMove({ startRow: r, startCol: c, endRow: kingRow, endCol: kingCol, board: this.board });

          // Restore the king piece
          this.board.board[kingRow][kingCol] = originalKingPiece;

          if (canAttackKing) {
            return true;
          }
        }
      }
    }

    return false;
  }

  switchPlayer(): void {
    this.currentPlayer = this.currentPlayer === PlayerColor.WHITE ? PlayerColor.BLACK : PlayerColor.WHITE;
  }

  isGameOver(): boolean {
    return !!this.winner;
  }
}