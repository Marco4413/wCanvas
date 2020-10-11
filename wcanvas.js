/*
Copyright (c) 2020 [hds536jhmk](https://github.com/hds536jhmk)

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

export const version = "0.1.0";

let uuid = 0;
/**
 * @returns {Number} An UUID
 */
export const generateUUID = () => { return uuid++; }

/**
 * Formats a string by replacing "{i}" with formats[i]
 * @param {String} str - The string to format
 * @param {...any} formats - The things to replace {i} with
 * @returns {String} The formatted string
 */
export const formatString = (str = "", ...formats) => {
    formats.forEach(
        (format, i) => {
            str = str.replace("{" + i + "}", String(format));
        }
    );

    return str;
}

/**
 * @typedef {Object} wCanvasConfig - wCanvas's config
 * @property {String} id - The id of the canvas you want to wrap
 * @property {HTMLCanvasElement} canvas - The canvas you want to wrap
 * @property {Number} width - The width of the canvas
 * @property {Number} height - The height of the canvas
 * @property {(canvas: wCanvas, window: Window, event: UIEvent) => {}} onResize - A callback that's called on window resize
 * @property {(canvas: wCanvas) => {}} onSetup - Function that gets called after the class was constructed
 * @property {(canvas: wCanvas, deltaTime: Number) => {}} onDraw - Function that gets called every frame
 * @property {Number} FPS - The targetted FPS (If negative it will draw every time the browser lets it)
 */

/**
 * @typedef {Object} ShapeConfig - Shapes' config
 * @property {Boolean} noStroke - Whether or not stroke should be applied
 * @property {Boolean} noFill - Whether or not the shape should be filled
 */

/**
 * @typedef {Object} __TextSpecificConfig
 * @property {Number} maxWidth - Text's max width
 * 
 * @typedef {ShapeConfig & __TextSpecificConfig} TextConfig - Texts' config
 */

export class Font {
    /**
     * @param {String} fontFamily - The Font Family to use
     * @param {Number} fontSize - The size of the font
     * @param {...String} attributes - All the extra CSS Attributes for the font
     */
    constructor(fontFamily = "Arial", fontSize = 12, ...attributes) {
        this.fontFamily = fontFamily;
        this.fontSize = fontSize;
        this.attributes = attributes;
    }

    /**
     * @returns {String} The font as a CSS property
     */
    toCSSProperty() {
        return formatString("{0} {1}px \"{2}\"", this.attributes.join(" "), this.fontSize, this.fontFamily);
    }
}

export class wCanvas {
    /**
     * The target FPS of the canvas
     * @type {Number}
     */
    FPS;
    /**
     * he canvas that is currently wrapped
     * @type {HTMLCanvasElement} 
     */
    canvas;
    /**
     * The time at which the last frame was drawn
     * @type {Number}
     */
    lastFrame;
    /**
     * Whether or not this is running a draw loop (Should only be read)
     * @readonly
     * @type {Boolean}
     */
    looping;

    /**
     * @param {wCanvasConfig} config - The config to create the wCanvas with
     */
    constructor(config = {}) {
        // Check if a Canvas was specified
        if (config.canvas === undefined) {
            // Check if an ID was specified
            if (config.id === undefined) {
                // If no ID was given then create a new canvas using an UUID
                this.canvas = document.createElement("canvas");
                this.canvas.id = String(generateUUID());
                document.body.appendChild(this.canvas);
            } else {
                // Get the canvas with the given ID
                this.canvas = document.getElementById(config.id);
            }
        } else {
            // Use the specified canvas
            this.canvas = config.canvas;
        }

        // Get the context of the created Canvas
        this.context = this.canvas.getContext("2d");

        // If a width and a height were given then set canvas's width and height to them
        if (config.width !== undefined && config.height !== undefined) {
            this.canvas.width = config.width;
            this.canvas.height = config.height;
        }

        // Check if resize callback was given
        if (config.onResize === undefined) {
            // If it wasn't given then make the canvas always resize to be fullscreen
            const onResize = () => {
                this.canvas.width = window.innerWidth + 1;
                this.canvas.height = window.innerHeight + 1;
            }

            window.addEventListener("resize", onResize);
            onResize();
        } else {
            // If it was add it to the window's event listener
            window.addEventListener("resize", (window, event) => {
                config.onResize(this, window, event);
            });
        }

        // A negative number of FPS means "Draw every time the browser lets you"
        this.FPS = config.FPS === undefined ? -1 : config.FPS;

        /**
         * @param {...any} args - Arguments to be passed to setup function
         */
        this.setup = (...args) => {
            config.onSetup(this, ...args);
        };

        /**
         * @param {Number} deltaTime - Time elapsed from the last drawn frame
         * @param {...any} args - Arguments to be passed to draw function
         */
        this.draw = (deltaTime, ...args) => {
            config.onDraw(this, deltaTime, ...args);
        };

        this.lastFrame = 0;
        this.looping = false;
        this.setup();
    }

    /**
     * Starts draw loop
     */
    startLoop() {
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
     */
    stopLoop() {
        this.looping = false;
    }

    /**
     * Saves canvas context to be restored at a later date
     * @param {Number} n - How many times the context should be saved
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
     * @param {Number} n - How many times the context should be restored
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
     * @param {Number} x - X translation
     * @param {Number} y - Y translation
     */
    translate(x = 0, y = 0) {
        this.context.translate(x, y);
    }
    
    /**
     * Rotates every next shape by the specified angle in radians
     * @param {Number} angle - Angle in radians
     */
    rotate(angle = 0) {
        this.context.rotate(angle);
    }

    /**
     * Scales every next shape by the specified values
     * @param {Number} x - Horizontal Scale
     * @param {Number} y - Vertical Scale
     */
    scale(x = 1, y = 1) {
        this.context.scale(x, y);
    }

    /**
     * Draws a rectangle that fills the entire canvas
     * @param {Number} r - Red [0, 255]
     * @param {Number} g - Green [0, 255]
     * @param {Number} b - Blue [0, 255]
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
     * @param {Number} r - Red [0, 255]
     * @param {Number} g - Green [0, 255]
     * @param {Number} b - Blue [0, 255]
     */
    fill(r = 255, g = 255, b = 255) {
        this.context.fillStyle = "rgb(" + [r, g, b].join(", ") + ")";
    }

    /**
     * Sets the color to be used for shapes contours
     * @param {Number} r - Red [0, 255]
     * @param {Number} g - Green [0, 255]
     * @param {Number} b - Blue [0, 255]
     */
    stroke(r = 0, g = 0, b = 0) {
        this.context.strokeStyle = "rgb(" + [r, g, b].join(", ") + ")";
    }

    /**
     * Changes stroke diameter
     * @param {Number} d - The diameter of the stroke
     */
    strokeWeigth(d = 1) {
        this.context.lineWidth = d;
    }

    /**
     * Draws a rectangle at the specified location with the specified properties
     * @param {Number} x - The x coordinate where the rectangle should be drawn
     * @param {Number} y - The y coordinate where the rectangle should be drawn
     * @param {Number} w - The width of the rectangle
     * @param {Number} h - The height of the rectangle
     * @param {ShapeConfig} config - Other options
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
     * @param {Number} x - The x coordinate where the circle should be drawn
     * @param {Number} y - The y coordinate where the circle should be drawn
     * @param {Number} r - The radius of the circle
     * @param {ShapeConfig} config - Other options
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
     * @param {Number} x - The x coordinate where the ellipse should be drawn
     * @param {Number} y - The y coordinate where the ellipse should be drawn
     * @param {Number} rX - The radius on the x axis of the ellipse
     * @param {Number} rY - The radius on the y axis of the ellipse
     * @param {ShapeConfig} config - Other options
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
     * @param {Number} x1 - The starting x coordinate 
     * @param {Number} y1 - The starting y coordinate 
     * @param {Number} x2 - The end x coordinate 
     * @param {Number} y2 - The end y coordinate 
     */
    line(x1, y1, x2, y2, round = true) {
        this.context.save();
        this.context.lineCap = round ? "round" : "square";
        
        this.context.beginPath();
        this.context.moveTo(x1, y1);
        this.context.lineTo(x2, y2);
        this.context.stroke();

        this.context.restore();
    }

    /**
     * Changes font
     * @param {Font} font - The new font to use
     */
    textFont(font = new Font()) {
        this.context.font = font.toCSSProperty();
    }

    /**
     * Changes font's size
     * @param {Number} size - The new size for the font
     */
    textSize(size = 12) {
        this.context.font = this.context.font.replace(/\d+px/g, String(size) + "px");
    }

    /**
     * @param {String} text - The text to be written
     * @param {Number} x - The x coordinate where the text should be drawn
     * @param {Number} y - The y coordinate where the text should be drawn
     * @param {TextConfig} config - Other options
     */
    text(text, x, y, config = { "noStroke": true }) {
        if (!config.noFill) {
            this.context.fillText(text, x, y, config.maxWidth);
        }

        if (!config.noStroke) {
            this.context.strokeText(text, x, y, config.maxWidth);
        }
    }
}
