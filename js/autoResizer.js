class AutoResizer {
    constructor(element, board) {
        this.board = board;
        this.element = element;
        this._initAutoResizer();
    }

    _initAutoResizer() {
        new ResizeObserver((_) => {
            this.updateCellsSize()
        }).observe(this.element);
    }

    _updateBasedOnWidth() {
        const elementWidth = this.element.offsetWidth - 40;
        const cellsSize = (elementWidth / (this.board.hSize));

        document.documentElement.style.setProperty('--cell-size', `${cellsSize}`);
    }

    _updateBasedOnHeigth() {
        const elementHeight = window.screen.height - 80;
        const cellsSize = (elementHeight / (this.board.vSize));

        document.documentElement.style.setProperty('--cell-size', `${cellsSize}`);
    }

    updateCellsSize() {
        const width = this.element.offsetWidth;
        const height = window.screen.height;

        if (height < width) {
            this._updateBasedOnHeigth();
        } else {
            this._updateBasedOnWidth();
        }
    }


}