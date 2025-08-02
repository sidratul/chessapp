import { Board, Piece, Pawn, Rook, Knight, Bishop, Queen, King } from '../src/board';
import { PlayerColor, PieceType } from '../src/types';

describe('Board', () => {
  let board: Board;

  beforeEach(() => {
    board = new Board();
  });

  test('should initialize with all pieces in correct positions', () => {
    // Test a few specific pieces
    expect(board.getPiece(0, 0)?.type).toBe(PieceType.ROOK);
    expect(board.getPiece(0, 0)?.color).toBe(PlayerColor.BLACK);
    expect(board.getPiece(1, 0)?.type).toBe(PieceType.PAWN);
    expect(board.getPiece(1, 0)?.color).toBe(PlayerColor.BLACK);
    expect(board.getPiece(7, 4)?.type).toBe(PieceType.KING);
    expect(board.getPiece(7, 4)?.color).toBe(PlayerColor.WHITE);
  });

  test('should move a piece from start to end position', () => {
    const initialPiece = board.getPiece(6, 0); // White pawn
    board.movePiece(6, 0, 5, 0);
    expect(board.getPiece(5, 0)).toBe(initialPiece);
    expect(board.getPiece(6, 0)).toBeNull();
  });

  test('should return null for out of bounds piece access', () => {
    expect(board.getPiece(-1, 0)).toBeNull();
    expect(board.getPiece(8, 0)).toBeNull();
  });

  test('parseCoordinate should correctly parse algebraic notation', () => {
    const { row, col } = board.parseCoordinate('a1');
    expect(row).toBe(7);
    expect(col).toBe(0);
  });

  test('parseCoordinate should correctly parse row,col notation', () => {
    const { row, col } = board.parseCoordinate('0,0');
    expect(row).toBe(0);
    expect(col).toBe(0);
  });

  test('parseCoordinate should throw error for invalid format', () => {
    expect(() => board.parseCoordinate('a')).toThrow('Invalid coordinate format.');
    expect(() => board.parseCoordinate('abc')).toThrow('Invalid coordinate format.');
  });

  test('parseCoordinate should throw error for out of bounds coordinates', () => {
    expect(() => board.parseCoordinate('a9')).toThrow('Coordinates out of board bounds.');
    expect(() => board.parseCoordinate('9,0')).toThrow('Coordinates out of board bounds.');
  });

  test('parseCoordinate should correctly parse algebraic notation with comma', () => {
    const { row, col } = board.parseCoordinate('a1');
    expect(row).toBe(7);
    expect(col).toBe(0);
  });

  test('parseCoordinate should correctly parse row,col notation with comma', () => {
    const { row, col } = board.parseCoordinate('0,0');
    expect(row).toBe(0);
    expect(col).toBe(0);
  });

  test('parseCoordinate should throw error for invalid format with comma', () => {
    expect(() => board.parseCoordinate('a')).toThrow('Invalid coordinate format.');
    expect(() => board.parseCoordinate('abc')).toThrow('Invalid coordinate format.');
    expect(() => board.parseCoordinate('a,b')).toThrow('Invalid coordinate format.');
  });

  test('parseCoordinate should throw error for out of bounds coordinates with comma', () => {
    expect(() => board.parseCoordinate('a9')).toThrow('Coordinates out of board bounds.');
    expect(() => board.parseCoordinate('9,0')).toThrow('Coordinates out of board bounds.');
  });
});