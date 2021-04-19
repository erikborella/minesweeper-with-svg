class Board {
    constructor(hSize, vSize, bombsPercentage) {
        this.hSize = hSize;
        this.vSize = vSize;
        this.bombsPercentage = bombsPercentage;

        this.numberOfBombs = Math.floor((this.hSize * this.vSize) * (this.bombsPercentage / 100));

        this.cells = [];
    }

    _isPositionValid(i, j) {
        return (i >= 0 && i < this.vSize && j >= 0 && j < this.hSize);
    }

    _initCells() {
        for (let i = 0; i < this.vSize; i++) {
            this.cells[i] = new Array(this.hSize);
            for (let j = 0; j < this.hSize; j++) {
                this.cells[i][j] = new Cell(i, j);
            }
        }
    }

    _updateCellAdjacentBombsValues(cell) {
        let bombsCounter = 0;

        for (let i = -1; i <= 1; i++) {
            for (let j = -1; j <= 1; j++) {
                const adjacentCellI = cell.i + i;
                const adjacentCellJ = cell.j + j;

                if (this._isPositionValid(adjacentCellI, adjacentCellJ) && (i != 0 || j != 0)) {
                    const adjacentCell = this.cells[adjacentCellI][adjacentCellJ];
                    if (adjacentCell.isBomb) {
                        bombsCounter++;
                    }
                }

            }    
        }

        cell.adjacentBombs = bombsCounter;
    }

    _updateBoardCellsAdjacentBombsValue() {
        for (let i = 0; i < this.vSize; i++) {
            for (let j = 0; j < this.hSize; j++) {
                const cell = this.cells[i][j];
                this._updateCellAdjacentBombsValues(cell);
            }
        }
    }

    generate(ignoredI, ignoredJ) {
        this._initCells();

        let bombGeneratedCounter = 0;

        while (bombGeneratedCounter < this.numberOfBombs) {
            const randomI = Math.floor(Math.random() * this.vSize);
            const randomJ = Math.floor(Math.random() * this.hSize);

            const randomCell = this.cells[randomI][randomJ];

            if (!randomCell.isBomb && (randomI != ignoredI || randomJ != ignoredJ)) {
                randomCell.isBomb = true;
                bombGeneratedCounter++;
            }
        }

        this._updateBoardCellsAdjacentBombsValue();
    }

}