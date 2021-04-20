class GameView {
    constructor(minesweeperBoard, elementId) {
        this.element = document.getElementById(elementId);
        this.board = minesweeperBoard;

        this.autoResizer = new AutoResizer(this.element, this.board);
    }

    generateView(onCellClick, onCellRightClick) {
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

                cellElementContent.oncontextmenu = (e) => {
                    e.preventDefault();
                    onCellRightClick(cell);
                    return false;
                }

                const li = document.createElement('li')
                li.appendChild(cellElement);

                this.element.appendChild(li);
            }
            this.element.appendChild(document.createElement('br'));
        }   
    }

    _getAnimationSpeed() {
        const animationSpeedStr = getComputedStyle(document.documentElement)
        .getPropertyValue('--animation_speed')
        .trim();

        return parseFloat(animationSpeedStr.substring(0, animationSpeedStr.length-1));

    }

    _flagCell(oldCellElement) {
        const cellTemplate = document.querySelector("#template-cell-flag");
        const cellElement = document.importNode(cellTemplate.content, true);
        const cellElementContent = cellElement.querySelector('svg');

        const i = oldCellElement.getAttribute('data-i');
        const j = oldCellElement.getAttribute('data-j');

        oldCellElement.replaceWith(cellElement);

        cellElementContent.setAttribute('data-i', i);
        cellElementContent.setAttribute('data-j', j);

        cellElementContent.onclick = oldCellElement.onclick;
        cellElementContent.oncontextmenu = oldCellElement.oncontextmenu;

        setTimeout(() => {
            cellElementContent.classList.add("open");
        }, 0);
    }

    _unFlagCell(cell, oldCellElement) {
        const cellTemplate = document.querySelector(`#template-cell-${cell.isBomb ? "bomb":cell.adjacentBombs}`)
        const cellElement = document.importNode(cellTemplate.content, true);
        const cellElementContent = cellElement.querySelector("svg");

        let animationSpeed = this._getAnimationSpeed();

        oldCellElement.classList.remove("open");

        this.actualAnimation = setTimeout(() => {              
            oldCellElement.replaceWith(cellElement)
            
            cellElementContent.setAttribute("data-i", cell.i);
            cellElementContent.setAttribute("data-j", cell.j);
            
            cellElementContent.onclick = oldCellElement.onclick;
            cellElementContent.oncontextmenu = oldCellElement.oncontextmenu;
        }, 0);
    }

    updateCell(cell) {
        const cellElement = document.querySelector(`svg.cell[data-i='${cell.i}'][data-j='${cell.j}']`);
        
        if (cell.isMarked) {
            this._flagCell(cellElement);
        } else if (!cell.isMarked && cellElement.classList.contains('flag') && !cell.isOpen) {
            this._unFlagCell(cell, cellElement);
        }

        if (cell.isOpen) {
            cellElement.classList.add('open');
        } else {
            cellElement.classList.remove('open');
        }
    }

    setBackgroundColor(cellType, color) {
        document.documentElement.style.setProperty(`--background-${cellType}-color`, color);
    }

    setFontColor(cellType, color) {
        document.documentElement.style.setProperty(`--font-${cellType}-color`, color);
    }

    openAllCells() {
        let cells = document.querySelectorAll("svg.cell");

        cells.forEach((cell) => {
            cell.classList.add("open");
            this.board.cells[cell.attributes['data-i'].value][cell.attributes['data-j'].value].isOpen = true;
        })

        
    }
}