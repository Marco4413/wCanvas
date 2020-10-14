/**
 * @file A Canvas Wrapper for JavaScript
 * @author
 * hds536jhmk <{@link https://github.com/hds536jhmk}>
 * @license
 * Copyright (c) 2020 hds536jhmk ({@link https://github.com/hds536jhmk/wCanvas})
 * 
 * Permission is hereby granted, free of charge, to any person
 * obtaining a copy of this software and associated documentation
 * files (the "Software"), to deal in the Software without
 * restriction, including without limitation the rights to use,
 * copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following
 * conditions:
 * 
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
 * OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
 * HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
 * WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
 * OTHER DEALINGS IN THE SOFTWARE.
 */

/**
 * The version of the library
 * @type {String}
 */
export const version = "0.1.5";

let uuid = 0;
/**
 * Generates an UUID used for all auto generated stuff from this library
 * @function
 * @returns {Number} An UUID
 */
export const generateUUID = () => { return uuid++; }

/**
 * Formats a string by replacing `{i}` with `formats[i]`
 * @function
 * @example formatString("const {0} = {1};", "variableName", "value") => "const variableName = value;"
 * @param {String} str - The string to format
 * @param {...any} [formats] - The things to replace `{i}` with
 * @returns {String} The formatted string
 */
export const formatString = (str, ...formats) => {
    formats.forEach(
        (format, i) => {
            str = str.replace("{" + i + "}", String(format));
        }
    );

    return str;
}

/**
 * @callback wCanvasConfig_onResize - Function that gets called on window resize
 * @param {wCanvas} canvas - The canvas it's attached to
 * @param {Window} window - The new window
 * @param {UIEvent} event - The event that triggered this call
 * @returns {undefined}
 */

/**
 * @callback wCanvasConfig_onSetup - Function that gets called after the class was constructed
 * @param {wCanvas} canvas - The canvas it's attached to
 * @returns {undefined}
 */

/**
 * @callback wCanvasConfig_onDraw - Function that gets called every frame
 * @param {wCanvas} canvas - The canvas it's attached to
 * @param {Number} deltaTime - The time elapsed between frames in seconds
 * @returns {undefined}
 */

/**
 * **CBCL**: "Can be changed later" means that a field of the config can be changed and it will have an effect on the {@link wCanvas} it's bound to
 * @typedef {Object} wCanvasConfig - wCanvas's config
 * @property {String} [id] - The id of the canvas you want to wrap
 * @property {HTMLCanvasElement} [canvas] - The canvas you want to wrap
 * @property {Number} [width] - **CBCL** (Reapplied only on resize) The width of the canvas
 * @property {Number} [height] - **CBCL** (Reapplied only on resize) The height of the canvas
 * @property {wCanvasConfig_onResize} [onResize] - **CBCL**
 * @property {wCanvasConfig_onSetup} [onSetup] - **CBCL**
 * @property {wCanvasConfig_onDraw} [onDraw] - **CBCL**
 * @property {Number} [FPS] - The targetted FPS (If negative it will draw every time the browser lets it)
 */

/**
 * @typedef {Object} ShapeConfig - Shapes' config
 * @property {Boolean} [noStroke] - Whether or not stroke should be applied
 * @property {Boolean} [noFill] - Whether or not the shape should be filled
 */

/**
 * @typedef {Object} PathConfig - Paths' config
 * @property {Boolean} [noStroke] - Whether or not stroke should be applied
 * @property {Boolean} [noFill] - Whether or not the shape should be filled
 * @property {Boolean} [round] - Whether or not corners should be round
 */

/**
 * @typedef {Object} TextConfig - Texts' config
 * @property {Boolean} [noStroke] - Whether or not stroke should be applied
 * @property {Boolean} [noFill] - Whether or not the shape should be filled
 * @property {Number} [maxWidth] - Text's max width
 * @property {Boolean} [returnWidth] - Whether or not to return text's width after it was drawn
 */

 /**
  * Stores font informations (To be used with {@link wCanvas#textFont})
  * @class
  */
export class Font {
    /**
     * The font family
     * @field
     * @type {String}
     */
    fontFamily;
    /**
     * The size of the font
     * @field
     * @type {Number}
     */
    fontSize;
    /**
     * Other font attributes like "italic", "oblique" and others
     * @field
     * @type {String[]}
     */
    attributes;

    /**
     * @param {String} [fontFamily] - The Font Family to use
     * @param {Number} [fontSize] - The size of the font
     * @param {...String} [attributes] - All the extra CSS Attributes for the font
     */
    constructor(fontFamily = "Arial", fontSize = 12, ...attributes) {
        this.fontFamily = fontFamily;
        this.fontSize = fontSize;
        this.attributes = attributes;
    }

    /**
     * Returns this font as a CSS property
     * @method
     * @returns {String} The font as a CSS property
     */
    toCSSProperty() {
        return formatString("{0} {1}px \"{2}\"", this.attributes.join(" "), this.fontSize, this.fontFamily);
    }
}

/**
 * Error given when a Canvas ID is invalid
 * @class
 * @extends {Error}
 */
export class InvalidCanvasIDException extends Error {
    /**
     * @constructor
     * @param {String} id - The id that generated this error
     */
    constructor(id) {
        super(formatString("No canvas with ID \"{0}\" was found!", id));
        this.name = "InvalidCanvasIDException";
    }
}

/**
 * Wraps a Canvas and provides useful functions
 * @class
 */
export class wCanvas {
    /**
     * The target FPS of the canvas (If it's a negative value it will try to draw every time it's possible)
     * @field
     * @type {Number}
     */
    FPS;
    /**
     * The canvas that is currently wrapped
     * @field
     * @constant
     * @type {HTMLCanvasElement} 
     */
    canvas;
    /**
     * The 2D drawing context of {@link wCanvas#canvas}
     * @field
     * @constant
     * @type {CanvasRenderingContext2D}
     */
    context;
    /**
     * The time at which the last frame was drawn
     * @field
     * @readonly
     * @type {Number}
     */
    lastFrame;
    /**
     * Whether or not this is running a draw loop
     * @field
     * @readonly
     * @type {Boolean}
     */
    looping;

    /**
     * @constructor
     * @param {wCanvasConfig} [config] - The config to create the wCanvas with
     * @throws {InvalidCanvasIDException}
     */
    constructor(config = {}) {
        // Check if a Canvas was specified
        if (config.canvas === undefined || config.canvas === null) {
            // Check if an ID was specified
            if (config.id === undefined) {
                // If no ID was given then create a new canvas using an UUID
                this.canvas = document.createElement("canvas");
                this.canvas.id = String(generateUUID());
                document.body.appendChild(this.canvas);
            } else {
                // Get the canvas with the given ID
                this.canvas = document.getElementById(config.id);
                if (this.canvas === null) {
                    throw new InvalidCanvasIDException(config.id);
                }
            }
        } else {
            // Use the specified canvas
            this.canvas = config.canvas;
        }

        // Get the context of the created Canvas
        this.context = this.canvas.getContext("2d");


        const defaultResize = () => {
            // If a width and a height were given then use them as the width and height
            if (config.width !== undefined && config.height !== undefined) {
                this.canvas.width = config.width;
                this.canvas.height = config.height;
            } else {
                // Otherwise make the canvas fullscreen
                this.canvas.width = window.innerWidth + 1;
                this.canvas.height = window.innerHeight + 1;
            }
        }
        defaultResize();

        // Add an event listener to the resize event
        window.addEventListener("resize", (...args) => {
            // If the user specified a callback on window resize
            if (config.onResize === undefined) {
                // Call the default resize function
                defaultResize();
            } else {
                // Call the user-specified callback
                config.onResize(this, ...args);
            }
        });

        // A negative number of FPS means "Draw every time the browser lets you"
        this.FPS = config.FPS === undefined ? -1 : config.FPS;

        /**
         * Calls the specified setup function from the config (If no function is found then it will start draw loop automatically)
         * @param {...any} [args] - Arguments to be passed to setup function
         * @returns {undefined}
         */
        this.setup = (...args) => {
            if (config.onSetup) {
                config.onSetup(this, ...args);
            } else {
                this.startLoop();
            }
        };

        /**
         * Calls the specified draw function from the config
         * @param {Number} deltaTime - Time elapsed from the last drawn frame
         * @param {...any} [args] - Arguments to be passed to draw function
         * @returns {undefined}
         */
        this.draw = (deltaTime, ...args) => {
            if (config.onDraw) {
                config.onDraw(this, deltaTime, ...args);
            }
        };

        this.lastFrame = 0;
        this.looping = false;
        this.setup();
    }

    /**
     * Starts draw loop (Doesn't do that if one was already started)
     * @method
     * @returns {undefined}
     */
    startLoop() {
        // If it's already looping then nothing should be done
        if (this.looping) {
            return;
        }

        this.looping = true;

        const callDraw = () => {
            if (this.FPS !== 0) {
                this.context.save();
                
                const newTimestamp = Date.now();
                this.draw((newTimestamp - this.lastFrame) / 1_000);
                this.lastFrame = newTimestamp;

                this.context.restore();
            }

            if (!this.looping) {
                return;
            }

            if (this.FPS <= 0) {
                requestAnimationFrame(callDraw);
            } else {
                setTimeout(callDraw, 1 / this.FPS * 1_000);
            }
        };

        this.lastFrame = Date.now();
        callDraw();
    }
    
    /**
     * Stops draw loop
     * @method
     * @returns {undefined}
     */
    stopLoop() {
        this.looping = false;
    }

    /**
     * Saves canvas context to be restored at a later date
     * @method
     * @param {Number} [n] - How many times the context should be saved
     * @returns {undefined}
     */
    save(n) {
        if (n) {
            for (let i = 0; i < n; i++) {
                this.context.save();
            }
        } else {
            this.context.save();
        }
    }

    /**
     * Restores canvas context from last save
     * @method
     * @param {Number} [n] - How many times the context should be restored
     * @returns {undefined}
     */
    restore(n) {
        if (n) {
            for (let i = 0; i < n; i++) {
                this.context.restore();
            }
        } else {
            this.context.restore();
        }
    }

    /**
     * Translates every next shape by the specified offset
     * @method
     * @param {Number} [x] - X translation
     * @param {Number} [y] - Y translation
     * @returns {undefined}
     */
    translate(x = 0, y = 0) {
        this.context.translate(x, y);
    }
    
    /**
     * Rotates every next shape by the specified angle in radians
     * @method
     * @param {Number} [angle] - Angle in radians
     * @returns {undefined}
     */
    rotate(angle = 0) {
        this.context.rotate(angle);
    }

    /**
     * Scales every next shape by the specified values
     * @method
     * @param {Number} [x] - Horizontal Scale
     * @param {Number} [y] - Vertical Scale
     * @returns {undefined}
     */
    scale(x = 1, y = 1) {
        this.context.scale(x, y);
    }

    /**
     * Clears the whole canvas
     * @method
     * @returns {undefined}
     */
    clear() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    /**
     * Draws a rectangle that fills the entire canvas
     * @method
     * @param {Number} [r] - Red [0, 255]
     * @param {Number} [g] - Green [0, 255]
     * @param {Number} [b] - Blue [0, 255]
     * @returns {undefined}
     */
    background(r = 0, g = 0, b = 0) {
        this.context.save();
        
        this.context.resetTransform();
        this.fill(r, g, b);
        this.rect(0, 0, this.canvas.width, this.canvas.height, { "noStroke": true });
        
        this.context.restore();
    }

    /**
     * Sets the color to be used to fill shapes
     * @method
     * @param {Number} [r] - Red [0, 255]
     * @param {Number} [g] - Green [0, 255]
     * @param {Number} [b] - Blue [0, 255]
     * @returns {undefined}
     */
    fill(r = 255, g = 255, b = 255) {
        this.context.fillStyle = "rgb(" + [r, g, b].join(", ") + ")";
    }

    /**
     * Sets the color to be used for shapes contours
     * @method
     * @param {Number} [r] - Red [0, 255]
     * @param {Number} [g] - Green [0, 255]
     * @param {Number} [b] - Blue [0, 255]
     * @returns {undefined}
     */
    stroke(r = 0, g = 0, b = 0) {
        this.context.strokeStyle = "rgb(" + [r, g, b].join(", ") + ")";
    }

    /**
     * Changes stroke diameter
     * @method
     * @param {Number} [d] - The diameter of the stroke
     * @returns {undefined}
     */
    strokeWeigth(d = 1) {
        this.context.lineWidth = d;
    }

    /**
     * Draws a rectangle at the specified location with the specified properties
     * @method
     * @param {Number} x - The x coordinate where the rectangle should be drawn
     * @param {Number} y - The y coordinate where the rectangle should be drawn
     * @param {Number} w - The width of the rectangle
     * @param {Number} h - The height of the rectangle
     * @param {ShapeConfig} [config] - Other options
     * @returns {undefined}
     */
    rect(x, y, w, h, config = {}) {
        if (!config.noFill) {
            this.context.fillRect(x, y, w, h);
        }

        if (!config.noStroke) {
            this.context.strokeRect(x, y, w, h);
        }
    }

    /**
     * Draws a circle at the specified location with the specified properties
     * @method
     * @param {Number} x - The x coordinate where the circle should be drawn
     * @param {Number} y - The y coordinate where the circle should be drawn
     * @param {Number} r - The radius of the circle
     * @param {ShapeConfig} [config] - Other options
     * @returns {undefined}
     */
    circle(x, y, r, config = {}) {
        this.context.beginPath();

        this.context.arc(x, y, r, 0, Math.PI * 2);
        
        if (!config.noFill) {
            this.context.fill();
        }

        if (!config.noStroke) {
            this.context.stroke();
        }
    }

    /**
     * Draws an ellipse at the specified location with the specified properties
     * @method
     * @param {Number} x - The x coordinate where the ellipse should be drawn
     * @param {Number} y - The y coordinate where the ellipse should be drawn
     * @param {Number} rX - The radius on the x axis of the ellipse
     * @param {Number} [rY] - The radius on the y axis of the ellipse
     * @param {ShapeConfig} [config] - Other options
     * @returns {undefined}
     */
    ellipse(x, y, rX, rY = rX, config = {}) {
        this.context.beginPath();

        this.context.ellipse(x, y, rX, rY, 0, 0, Math.PI * 2);
        
        if (!config.noFill) {
            this.context.fill();
        }

        if (!config.noStroke) {
            this.context.stroke();
        }
    }

    /**
     * Draws a line from x1, y1 to x2, y2
     * @method
     * @param {Number} x1 - The starting x coordinate 
     * @param {Number} y1 - The starting y coordinate 
     * @param {Number} x2 - The end x coordinate 
     * @param {Number} y2 - The end y coordinate 
     * @param {Boolean} [round] - Whether or not line ends should be rounded
     * @returns {undefined}
     */
    line(x1, y1, x2, y2, round = true) {
        const oldLineCap = this.context.lineCap;
        this.context.lineCap = round ? "round" : "square";
        
        this.context.beginPath();
        this.context.moveTo(x1, y1);
        this.context.lineTo(x2, y2);
        this.context.stroke();

        this.context.lineCap = oldLineCap;
    }

    /**
     * Draws a shape using the specified vertices (Tries to draw only if there are 2 or more vertices specified)
     * @method
     * @param {Array<Array<Number>>} vertices - Array of Vertices (A vertex is this kind of array [x, y])
     * @param {PathConfig} [config] - Other options
     * @returns {undefined}
     */
    path(vertices, config = {}) {
        if (vertices.length <= 1) {
            return;
        }

        this.context.beginPath();

        const firstVertex = vertices[0];
        this.context.moveTo(firstVertex[0], firstVertex[1]);

        for (let i = 1; i < vertices.length; i++) {
            const vertex = vertices[i];
            this.context.lineTo(vertex[0], vertex[1]);
        }

        this.context.closePath();

        if (!config.noFill) {
            this.context.fill();
        }

        if (!config.noStroke) {
            const oldLineJoin = this.context.lineJoin;
            this.context.lineJoin = config.round || config.round === undefined ? "round" : "miter";

            this.context.stroke();
            
            this.context.lineJoin = oldLineJoin;
        }
    }

    /**
     * Changes font
     * @method
     * @param {Font} [font] - The new font to use
     * @returns {undefined}
     */
    textFont(font = new Font()) {
        this.context.font = font.toCSSProperty();
    }

    /**
     * Changes font's size
     * @method
     * @param {Number} [size] - The new size for the font
     * @returns {undefined}
     */
    textSize(size = 12) {
        this.context.font = this.context.font.replace(/\d+px/g, String(size) + "px");
    }

    /**
     * Draws the specified text at the specified coordinates
     * @method
     * @param {String} text - The text to be written
     * @param {Number} x - The x coordinate where the text should be drawn
     * @param {Number} y - The y coordinate where the text should be drawn
     * @param {TextConfig} [config] - Other options
     * @returns {undefined|Number} If config.returnWidth is true it returns the text's width
     */
    text(text, x, y, config = {}) {
        if (!config.noFill) {
            this.context.fillText(text, x, y, config.maxWidth);
        }

        if (!(config.noStroke || config.noStroke === undefined)) {
            this.context.strokeText(text, x, y, config.maxWidth);
        }

        if (config.returnWidth) {
            return this.context.measureText(text).width;
        }
    }
}
