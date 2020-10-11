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

export const version = "0.0.5";

let uuid = 0;
export const generateUUID = () => { return uuid++; }

/**
 * @typedef wcanvasConfig - wCanvas's config
 * @property {String} id - The id of the canvas you want to wrap
 * @property {HTMLCanvasElement} canvas - The canvas you want to wrap
 * @property {Number} width - The width of the canvas
 * @property {Number} height - The height of the canvas
 * @property {(canvas: wcanvas, window: Window, event: UIEvent) => {}} onResize - A callback that's called on window resize
 * @property {(canvas: wcanvas) => {}} onSetup - Function that gets called after the class was constructed
 * @property {(canvas: wcanvas, deltaTime: Number) => {}} onDraw - Function that gets called every frame
 * @property {Number} FPS - The targetted FPS (If negative it will draw every time the browser lets it)
 */

/**
 * @typedef ShapeConfig - Shapes' config
 * @property {Boolean} noStroke - Whether or not stroke should be applied
 * @property {Boolean} noFill - Whether or not the shape should be filled
 */

export class wcanvas {
    /**
     * @param {wcanvasConfig} config
     */
    constructor(config) {
        // If no config was given then set it to an empty object
        config = config === undefined ? {} : config;

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
                /**
                 * @type {HTMLCanvasElement}
                 */
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
     * Draws a rectangle that fills the entire canvas
     * @param {Number} r - Red [0, 255]
     * @param {Number} g - Green [0, 255]
     * @param {Number} b - Blue [0, 255]
     */
    background(r, g, b) {
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
    fill(r, g, b) {
        this.context.fillStyle = "rgb(" + [r, g, b].join(", ") + ")";
    }

    /**
     * Sets the color to be used for shapes contours
     * @param {Number} r - Red [0, 255]
     * @param {Number} g - Green [0, 255]
     * @param {Number} b - Blue [0, 255]
     */
    stroke(r, g, b) {
        this.context.fillStyle = "rgb(" + [r, g, b].join(", ") + ")";
    }

    /**
     * Change's stroke radius
     * @param {Number} r - The radius of the stroke
     */
    strokeWeigth(r) {
        this.context.lineWidth = r;
    }

    /**
     * Draws a rectangle at the specified location with the specified properties
     * @param {Number} x - The x coordinate where the rectangle should be drawn
     * @param {Number} y - The y coordinate where the rectangle should be drawn
     * @param {Number} w - The width of the rectangle
     * @param {Number} h - The height of the rectangle
     * @param {ShapeConfig} config - Other options
     */
    rect(x, y, w, h, config) {
        config = config === undefined ? {} : config;

        if (!config.noFill) {
            this.context.fillRect(x, y, w, h);
        }

        if (!config.noStroke) {
            this.context.strokeRect(x, y, w, h);
        }
    }
}
