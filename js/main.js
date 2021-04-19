const board = new Board(5, 5, 10);
board.generate(0, 0);

let gameView = new GameView(board, "board");

gameView.generateView((cell) => {
    cell.isOpen = !cell.isOpen;
    gameView.updateCell(cell);
});