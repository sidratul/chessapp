# CLI Chess Game

This is a simple command-line interface (CLI) chess game built with Node.js and TypeScript.

## Features

- Standard 8x8 chessboard setup.
- Basic piece movement (Pawn, Rook, Knight, Bishop, Queen, King).
- Input handling for moves using algebraic notation (e.g., `a2,a3`).
- Input validation.
- Game ends when a King is captured.
- Colored pieces for better readability (white pieces are white, black pieces are black).
- Colored board boundaries, letters, and numbers using `chalk`.

## Pre-installation

Before you begin, ensure you have Node.js installed on your system. Node.js is a JavaScript runtime that allows you to run JavaScript code outside of a web browser.

**Recommended Node.js Version:**
It is highly recommended to use the latest Long Term Support (LTS) version of Node.js. You can download it from the official Node.js website: [https://nodejs.org/](https://nodejs.org/)

**How to Install Node.js:**
Follow the instructions on the Node.js website for your operating system. For most systems, you can download an installer or use a package manager.

## Setup

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/sidratul/chessapp
    cd chessapp
    ```

2.  **Install dependencies:**

    Open your terminal or command prompt in the project directory and run:

    ```bash
    npm install
    ```

## How to Run

To start the game, run the following command in your terminal:

```bash
npm start
```

The game will display the chessboard with colored pieces and prompt you for moves. Enter your moves in the format `start_coordinate end_coordinate` (e.g., `e2 e4` or `6,4 4,4`).

## Running Tests

To run the unit tests, use the following command:

```bash
npm test
```

This will compile the TypeScript files and then execute all tests and report any failures.