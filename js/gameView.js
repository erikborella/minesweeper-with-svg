class GameView {
    constructor(minesweeperBoard, elementId) {
        this.element = document.getElementById(elementId);
        this.board = minesweeperBoard;
    }

    generateView(onCellClick) {
        for (let i = 0; i < this.board.vSize; i++) {
            for (let j = 0; j < this.board.hSize; j++) {
                const cell = this.board.cells[i][j];

                const cellTemplate = document.querySelector(`#template-cell-${cell.isBomb ? "bomb":cell.adjacentBombs}`)
                const cellElement = document.importNode(cellTemplate.content, true);
                const cellElementContent = cellElement.querySelector("svg");
                
                cellElementContent.setAttribute("data-i", i);
                cellElementContent.setAttribute("data-j", j);

                cellElementContent.onclick = (e) => {
                    onCellClick(cell);
                };

                this.element.appendChild(cellElement);
            }
            this.element.appendChild(document.createElement('br'));
        }   
    }

    updateCell(cell) {
        const cellElement = document.querySelector(`svg.cell[data-i='${cell.i}'][data-j='${cell.j}']`);

        if (cell.isOpen) {
            cellElement.classList.add('open');
        } else {
            cellElement.classList.remove('open');
        }
    }
}