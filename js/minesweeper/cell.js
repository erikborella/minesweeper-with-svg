class Cell {
    constructor(i, j) {
        this.i = i;
        this.j = j;

        this.isBomb = false;
        this.isMarked =  false;
        this.adjacentBombs = 0;
    }
}