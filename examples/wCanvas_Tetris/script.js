
/*
Copyright (c) 2020 [hds536jhmk](https://github.com/hds536jhmk/wCanvas/tree/master/examples/wCanvas_Tetris)

Permission is hereby granted, free of charge, to any person
obtaining a copy of this software and associated documentation
files (the "Software"), to deal in the Software without
restriction, including without limitation the rights to use,
copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the
Software is furnished to do so, subject to the following
conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
OTHER DEALINGS IN THE SOFTWARE.
*/

import { wCanvas, formatString, Font } from "../../wcanvas.js";

/* SETTINGS START */
const KEY_BINDINGS = {
    "rotate"    : [ "w", "ArrowUp"    ],
    "moveLeft"  : [ "a", "ArrowLeft"  ],
    "moveDown"  : [ "s", "ArrowDown"  ],
    "moveRight" : [ "d", "ArrowRight" ]
};

const FONT = new Font("Arial", 12);

const SHADOW_COLOR = "#d3d3d3";
const SHOW_TETROMINO_SHADOW = true;
const TC = { // TC: Tetrominoes' Colors
    "I":    "cyan",
    "J":    "blue",
    "L":  "orange",
    "O":  "yellow",
    "S":   "green",
    "T": "magenta",
    "Z":     "red"
};

const GRID_BORDER_COLOR = "#fff";
const SHAPE_BORDER_COLOR = "#000";
const TEXT_COLOR = "#fff";
const BACKGROUND_COLOR = "#000";

const PADDING = 10;
const CELL_SIZE = 16;

const SCALE_HEIGHT = 970;
const SCALE = 2.5;

const DISPLAY_NEXT = 4;
const POOL_SIZE = 10;

const SCORES = [
    40, 100, 300, 1200
];
/* SETTINGS END */

const EMPTY_CELL = " ";
const SHAPES = 6;

/**
 * Returns a new shape from the specified ID
 * @param {Number} shapeID - The ID of the Shape to generate
 * @returns {Shapes}
 */
function genShape(shapeID) {
    switch (shapeID) {
        case 0:
            return [
                [[EMPTY_CELL, EMPTY_CELL, TC.I],
                 [EMPTY_CELL, EMPTY_CELL, TC.I],
                 [EMPTY_CELL, EMPTY_CELL, TC.I],
                 [EMPTY_CELL, EMPTY_CELL, TC.I]],
                 
                [[EMPTY_CELL, EMPTY_CELL, EMPTY_CELL, EMPTY_CELL],
                 [EMPTY_CELL, EMPTY_CELL, EMPTY_CELL, EMPTY_CELL],
                 [      TC.I,       TC.I,       TC.I,       TC.I]],
                 
                [[EMPTY_CELL, TC.I],
                 [EMPTY_CELL, TC.I],
                 [EMPTY_CELL, TC.I],
                 [EMPTY_CELL, TC.I]],

                [[EMPTY_CELL, EMPTY_CELL, EMPTY_CELL, EMPTY_CELL],
                 [      TC.I,       TC.I,       TC.I,       TC.I]]
            ];
        case 1:
            return [
                [[EMPTY_CELL, TC.J],
                 [EMPTY_CELL, TC.J],
                 [      TC.J, TC.J]],

                [[TC.J, EMPTY_CELL, EMPTY_CELL],
                 [TC.J,       TC.J,       TC.J]],

                [[EMPTY_CELL, TC.J,       TC.J],
                 [EMPTY_CELL, TC.J, EMPTY_CELL],
                 [EMPTY_CELL, TC.J, EMPTY_CELL]],

                [[EMPTY_CELL, EMPTY_CELL, EMPTY_CELL],
                 [      TC.J,       TC.J,       TC.J],
                 [EMPTY_CELL, EMPTY_CELL,       TC.J]]
            ];
        case 2:
            return [
                [[EMPTY_CELL, TC.L, EMPTY_CELL],
                 [EMPTY_CELL, TC.L, EMPTY_CELL],
                 [EMPTY_CELL, TC.L,       TC.L]],
                 
                [[EMPTY_CELL, EMPTY_CELL, EMPTY_CELL],
                 [      TC.L,       TC.L,       TC.L],
                 [      TC.L, EMPTY_CELL, EMPTY_CELL]],

                [[      TC.L, TC.L],
                 [EMPTY_CELL, TC.L],
                 [EMPTY_CELL, TC.L]],
                
                [[EMPTY_CELL, EMPTY_CELL, TC.L],
                 [      TC.L,       TC.L, TC.L]],


            ];
        case 3:
            return [
                [[TC.O, TC.O],
                 [TC.O, TC.O]]
            ];
        case 4:
            return [
                [[EMPTY_CELL,       TC.S, EMPTY_CELL],
                 [EMPTY_CELL,       TC.S,       TC.S],
                 [EMPTY_CELL, EMPTY_CELL,       TC.S]],

                [[EMPTY_CELL, EMPTY_CELL, EMPTY_CELL],
                 [EMPTY_CELL,       TC.S,       TC.S],
                 [      TC.S,       TC.S, EMPTY_CELL]],
                
                [[      TC.S, EMPTY_CELL],
                 [      TC.S,       TC.S],
                 [EMPTY_CELL,       TC.S]],

                [[EMPTY_CELL,    TC.S,       TC.S],
                 [      TC.S,    TC.S, EMPTY_CELL]]
            ];
        case 5:
            return [
                [[EMPTY_CELL, TC.T, EMPTY_CELL],
                 [      TC.T, TC.T,       TC.T]],

                [[EMPTY_CELL, TC.T, EMPTY_CELL],
                 [EMPTY_CELL, TC.T,       TC.T],
                 [EMPTY_CELL, TC.T, EMPTY_CELL]],

                [[EMPTY_CELL, EMPTY_CELL, EMPTY_CELL],
                 [      TC.T,       TC.T,       TC.T],
                 [EMPTY_CELL,       TC.T, EMPTY_CELL]],

                [[EMPTY_CELL, TC.T],
                 [      TC.T, TC.T],
                 [EMPTY_CELL, TC.T]]
            ];
        case 6:
            return [
                [[EMPTY_CELL, EMPTY_CELL,       TC.Z],
                 [EMPTY_CELL,       TC.Z,       TC.Z],
                 [EMPTY_CELL,       TC.Z, EMPTY_CELL]],

                [[EMPTY_CELL, EMPTY_CELL, EMPTY_CELL],
                 [      TC.Z,       TC.Z, EMPTY_CELL],
                 [EMPTY_CELL,       TC.Z,       TC.Z]],
                
                [[EMPTY_CELL,       TC.Z],
                 [      TC.Z,       TC.Z],
                 [      TC.Z, EMPTY_CELL]],
 
                [[      TC.Z, TC.Z, EMPTY_CELL],
                 [EMPTY_CELL, TC.Z,       TC.Z]]
            ];
    }
}

/**
 * Draws the specified shape at the specified x and y
 * @param {wCanvas} canvas - The canvas to draw on
 * @param {Number} x - The x pos
 * @param {Number} y - The y pos
 * @param {Shape} shape - The shape to draw
 */
function drawShape(canvas, x, y, shape, color) {
    if (shape !== undefined) {
        for (let relY = 0; relY < shape.length; relY++) {
            const row = shape[relY];
            for (let relX = 0; relX < row.length; relX++) {
                const cellColor = row[relX];
                if (cellColor === EMPTY_CELL) {
                    continue;
                }

                canvas.fillCSS(color === undefined ? cellColor : color);
                canvas.rect(
                    (x + relX) * CELL_SIZE, (y + relY) * CELL_SIZE,
                    CELL_SIZE, CELL_SIZE
                );
            }
        }
    }
}

/**
 * @typedef {Array<Array<Number>>} Shape
 */

/**
 * @typedef {Array<Shape>} Shapes
 */

/**
 * @typedef {{x: Number, y: Number}} Point
 */

class Tetromino {
    /**
     * @param {Shapes} shapes - The shapes that the tetromino can have
     * @param {Point} pos - The pos of the tetromino
     * @param {World} world - The world the tetromino is bound to
     */
    constructor(shapes, pos, world) {
        this.shapeIndex = 0;
        this.shapes = shapes;
        this.pos = pos;
        this.world = world;
    }

    /**
     * Updates the tetromino
     * @returns {Boolean} If it couldn't move down
     */
    update() {
        return !this.moveY(1);
    }

    /**
     * Draws the tetromino
     * @param {wCanvas} canvas - The canvas to draw the tetromino on
     */
    draw(canvas) {
        drawShape(canvas, this.pos.x, this.pos.y, this.getCurrentShape());
    }

    /**
     * Draws Tetromino's shadow showing where it's dropping
     * @param {wCanvas} canvas - The canvas to draw the shadow on
     */
    drawShadow(canvas) {
        const shape = this.getCurrentShape();
        for (let y = this.pos.y; y < this.world.height; y++) {
            if (!this.world.tetrominoFits(this, undefined, y)) {
                drawShape(canvas, this.pos.x, y - 1, shape, SHADOW_COLOR);
                break;
            }
        }
    }

    /**
     * Goes back to the previous shape
     * @returns {Boolean} If it was able to change shape
     */
    previousShape() {
        const oldIndex = this.shapeIndex;
        if (--this.shapeIndex < 0) {
            this.shapeIndex = this.shapes.length - 1;
        }

        if (this.world.tetrominoFits(this)) {
            return true;
        }

        this.shapeIndex = oldIndex;
        return false;
    }

    /**
     * Goes forward to the next shape
     * @returns {Boolean} If it was able to change shape
     */
    nextShape() {
        const oldIndex = this.shapeIndex;
        if (++this.shapeIndex >= this.shapes.length) {
            this.shapeIndex = 0;
        }

        if (this.world.tetrominoFits(this)) {
            return true;
        }

        this.shapeIndex = oldIndex;
        return false;
    }

    /**
     * Returns the shape that is being used by the tetromino
     * @returns {Shape} The current shape of the tetromino
     */
    getCurrentShape() {
        return this.shapes[this.shapeIndex];
    }

    /**
     * Moves the tetromino on the X axis
     * @param {Number} ammount - How many cells the tetromino should move
     * @returns {Boolean} Whether or not it could move into the specified pos
     */
    moveX(ammount) {
        if (this.world.tetrominoFits(this, this.pos.x + ammount)) {
            this.pos.x += ammount;
            return true;
        }

        return false;
    }

    /**
     * Moves the tetromino on the Y axis
     * @param {Number} ammount - How many cells the tetromino should move
     * @returns {Boolean} Whether or not it could move into the specified pos
     */
    moveY(ammount) {
        if (this.world.tetrominoFits(this, undefined, this.pos.y + ammount)) {
            this.pos.y += ammount;
            return true;
        }
        
        return false;
    }
}

class World {
    /**
     * Contains all pre-generated tetrominoes
     * @type {Array<Tetromino>}
     */
    tetrominoesPool;

    /**
     * Currently updated tetromino
     * @type {Tetromino}
     */
    currentTetromino;

    /**
     * The grid of the world
     * @type {Array<Array<Number>>}
     */
    grid;

    /**
     * 
     * @param {Number} w - The width of the world
     * @param {Number} h - The height of the world
     */
    constructor(w, h) {
        this.score = 0;

        this.width = w;
        this.height = h;

        this.tetrominoesPool = [];

        this.clearGrid();
    }

    /**
     * Clears grid's world
     */
    clearGrid() {
        this.grid = [];
        for (let y = 0; y < this.height; y++) {
            this.grid[y] = [];
            for (let x = 0; x < this.width; x++) {
                this.grid[y][x] = EMPTY_CELL;
            }
        }
    }

    /**
     * Adds the tetromino to the world's grid
     * @param {Tetromino} tetromino - The tetromino to solidify
     */
    solidifyTetromino(tetromino) {
        const shape = tetromino.getCurrentShape();
        for (let relY = 0; relY < shape.length; relY++) {
            const row = shape[relY];
            for (let relX = 0; relX < row.length; relX++) {
                const cellColor = row[relX];
                if (cellColor === EMPTY_CELL) {
                    continue;
                }

                this.setGridCell(tetromino.pos.x + relX, tetromino.pos.y + relY, cellColor);
            }
        }
    }

    /**
     * Picks a new tetromino from the pool
     * @returns {Tetromino} The new current tetromino
     */
    nextTetromino() {
        this.currentTetromino = this.tetrominoesPool.shift();
        return this.currentTetromino;
    }

    /**
     * Adds a new tetromino to the pool by using a shape
     * @param {Shape} shape - The shape of the new tetromino
     * @returns {Tetromino} The newly added tetromino
     */
    addTetrominoToPool(shape) {
        if (shape.length <= 0) {
            return;
        }

        const shapeWidth = shape[0].length;
        const newTetromino = new Tetromino(shape, { "x": Math.floor((this.width - shapeWidth) / 2), "y": 0 }, this);
        this.tetrominoesPool.push(newTetromino);

        return newTetromino;
    }

    /**
     * Updates the world
     * @returns {Boolean} Whether or not the grid was cleared (Player lost)
     */
    update() {
        if (this.currentTetromino === undefined) {
            return false;
        }

        if (this.currentTetromino.update()) {
            this.solidifyTetromino(this.currentTetromino);

            let clearedRows = 0;
            const shape = this.currentTetromino.getCurrentShape();
            for (let relY = 0; relY < shape.length; relY++) {
                const y = this.currentTetromino.pos.y + relY;

                const row = this.grid[y];
                if (!row.includes(" ")) {
                    this.grid.splice(y, 1);
                    this.grid.unshift([]);
                    for (let x = 0; x < this.width; x++) {
                        this.grid[0][x] = EMPTY_CELL;
                    }
                    clearedRows++;
                }
            }

            if (clearedRows > 0) {
                this.score += SCORES[Math.min(SCORES.length, clearedRows) - 1];
            }

            
            this.addTetrominoToPool(
                genShape(Math.floor(Math.random() * SHAPES))
            );
            
            const newTetromino = this.nextTetromino();
            if (!this.tetrominoFits(newTetromino)) {
                this.clearGrid();
                this.score = 0;
                return true;
            }
        }

        return false;
    }

    /**
     * Draws the world
     * @param {wCanvas} canvas - The canvas to draw the world on
     */
    draw(canvas) {
        for (let y = 0; y < this.grid.length; y++) {
            const row = this.grid[y];
            for (let x = 0; x < row.length; x++) {
                const cellColor = row[x];
                if (cellColor === EMPTY_CELL) {
                    continue;
                }

                canvas.fillCSS(cellColor);
                canvas.rect(
                    x * CELL_SIZE, y * CELL_SIZE,
                    CELL_SIZE, CELL_SIZE
                );
            }
        }
    }

    /**
     * Sets a grid's cell to the specified color
     * @param {Number} x - The x pos on the grid
     * @param {Number} y - The y pos on the grid
     * @param {String} cellColor - The new cell color
     */
    setGridCell(x, y, cellColor) {
        if (x < 0 || x >= this.width || y < 0 || y >= this.height) {
            return false;
        }

        this.grid[y][x] = cellColor;
        return true;
    }

    /**
     * Returns the color of a grid's cell
     * @param {Number} x - The x pos on the grid
     * @param {Number} y - The y pos on the grid
     * @returns {String} The cell Color
     */
    getGridCell(x, y) {
        if (x < 0 || x >= this.width || y < 0 || y >= this.height) {
            return BACKGROUND_COLOR;
        }

        return this.grid[y][x];
    }

    /**
     * Checks if the specified tetromino can stay in its current position
     * @param {Tetromino} tetromino - The tetromino to check for
     * @param {Number} x - Uses this value as the x pos of the tetromino (if `undefined` it will use tetromino's pos)
     * @param {Number} y - Uses this value as the y pos of the tetromino (if `undefined` it will use tetromino's pos)
     * @returns {Boolean} Whether or not the tetromino can stay
     */
    tetrominoFits(tetromino, x, y) {
        x = x === undefined ? tetromino.pos.x : x;
        y = y === undefined ? tetromino.pos.y : y;

        const shape = tetromino.getCurrentShape();
        for (let relY = 0; relY < shape.length; relY++) {
            const row = shape[relY];
            for (let relX = 0; relX < row.length; relX++) {
                const cellColor = row[relX];
                if (cellColor === EMPTY_CELL) {
                    continue;
                }

                if (this.getGridCell(x + relX, y + relY) !== EMPTY_CELL) {
                    return false;
                }
            }
        }

        return true;
    }
}

const WORLD = new World(10, 20);
let highScore = 0;

/**
 * Set's canvas defaults
 * @param {wCanvas} canvas - The canvas where the default options should be set in
 */
function injectDefaults(canvas) {
    canvas.textFont(FONT);
    canvas.strokeWeigth(1);
    canvas.strokeCSS(GRID_BORDER_COLOR);
    canvas.translate(PADDING);
    canvas.scale(window.innerHeight / SCALE_HEIGHT * SCALE);
}

/**
 * Sets up the game
 * @param {wCanvas} canvas
 */
function setup(canvas) {
    for (let i = 0; i < POOL_SIZE; i++) {
        WORLD.addTetrominoToPool(
            genShape(Math.floor(Math.random() * SHAPES))
        );
    }

    WORLD.nextTetromino();

    injectDefaults(canvas);

    canvas.startLoop();
}

/**
 * Updates the game
 */
function update() {
    WORLD.update();

    highScore = Math.max(WORLD.score, highScore);
}

/**
 * Draws the game
 * @param {wCanvas} canvas
 * @param {Number} deltaTime
 */
function draw(canvas, deltaTime) {
    canvas.backgroundCSS(BACKGROUND_COLOR);

    canvas.line(0, 0, 0, WORLD.height * CELL_SIZE);
    canvas.line(WORLD.width * CELL_SIZE, 0, WORLD.width * CELL_SIZE, WORLD.height * CELL_SIZE);
    canvas.line(0, WORLD.height * CELL_SIZE, WORLD.width * CELL_SIZE, WORLD.height * CELL_SIZE);

    canvas.strokeCSS(SHAPE_BORDER_COLOR);
    
    WORLD.draw(canvas);

    if (SHOW_TETROMINO_SHADOW) {
        WORLD.currentTetromino.drawShadow(canvas);
    }
    WORLD.currentTetromino.draw(canvas);

    const playAreaHeight = WORLD.height * CELL_SIZE + PADDING;
    canvas.fillCSS(TEXT_COLOR);
    canvas.text(formatString("Score: {0}", WORLD.score), 0, playAreaHeight + FONT.fontSize, { "noStroke": true });
    canvas.text(formatString("Highscore: {0}", highScore), 0, playAreaHeight + PADDING + 2 * FONT.fontSize, { "noStroke": true });


    canvas.translate(WORLD.width * CELL_SIZE + PADDING, 0);
    const shapesToShow = Math.min(WORLD.tetrominoesPool.length, DISPLAY_NEXT);
    for (let i = 0; i < shapesToShow; i++) {
        const shape = WORLD.tetrominoesPool[i].getCurrentShape();
        const shapeHeight = shape.length * CELL_SIZE;
        drawShape(canvas, 0, 0, shape);
        canvas.translate(0, shapeHeight + PADDING);
    }
}

window.addEventListener("keydown", (e) => {
    const tetromino = WORLD.currentTetromino;
    if (tetromino === undefined) {
        return;
    }

    if (KEY_BINDINGS.rotate.includes(e.key)) {
        tetromino.nextShape();
    } else if (KEY_BINDINGS.moveLeft.includes(e.key)) {
        tetromino.moveX(-1);
    } else if (KEY_BINDINGS.moveDown.includes(e.key)) {
        tetromino.moveY(1);
    } else if (KEY_BINDINGS.moveRight.includes(e.key)) {
        tetromino.moveX(1);
    }
});

window.addEventListener("load", () => {
    new wCanvas({
        "onSetup": setup,
        "onDraw": draw,
        "onResize": (canvas) => {
            canvas.canvas.width = window.innerWidth + 1;
            canvas.canvas.height = window.innerHeight + 1;

            injectDefaults(canvas);
        }
    })

    setInterval(update, 1_000);
});
