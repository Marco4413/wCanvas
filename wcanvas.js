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
 * @constant
 * @type {String}
 */
export const version = "0.1.14";

/**
 * Generates an UUID used for all auto generated stuff from this library
 * @function
 * @returns {Number} An UUID within the library
 */
export const generateUUID = (function () {
    let uuid = 0;
    return () => { return uuid++; }
})();

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
 * A namespace that provides some useful math functions
 * @namespace
 */
export class UMath {

    constructor() {
        throw new Error("This class is supposed to be a namespace, you can't call its constructor!");
    }

    /**
     * Constrains a number between the specified range
     * @method
     * @static
     * @param {Number} val - The number to be constrained
     * @param {Number} start - The minimum number that the specified one can be
     * @param {Number} end - The maximum number that the specified one can be
     * @returns {Number} The constrained number
     */
    static constrain(val, start, end) {
        return Math.max(Math.min(val, end), start);
    }

    /**
     * Linearly interpolates the specified number to the specified target
     * @method
     * @static
     * @param {Number} val - The number to interpolate
     * @param {Number} target - The target of the specified value
     * @param {Number} perc - How near value should be to target [0; 1]
     * @returns {Number} The interpolated value
     */
    static lerp(val, target, perc) {
        return val + (target - val) * UMath.constrain(perc, 0, 1);
    }

    /**
     * Maps the specified value that is in the range [start1; end1] to the new range [start2; end2]
     * @method
     * @static
     * @param {Number} val - The value to be mapped
     * @param {Number} start1 - The start of the value's range
     * @param {Number} end1 - The end of the value's range
     * @param {Number} start2 - The start of the value's new range
     * @param {Number} end2 - The end of the value's new range
     * @param {Boolean} constrain - Whether or not the mapped value should be contrained to the new range
     * @returns {Number} The mapped value
     */
    static map(val, start1, end1, start2, end2, constrain = false) {
        const mappedValue = (val - start1) / (end1 - start1) * (end2 - start2) + start2;
        return constrain ? UMath.constrain(mappedValue, start2, end2) : mappedValue;
    }

    /**
     * Returns the squared distance between two points (See: {@link UMath.dist})
     * @method
     * @static
     * @param {Number} x1 - The x of the first point
     * @param {Number} y1 - The y of the first point
     * @param {Number} x2 - The x of the second point
     * @param {Number} y2 - The y of the second point
     * @returns {Number} The squared distance between the two points
     */
    static distSq(x1, y1, x2, y2) {
        const x = x2 - x1;
        const y = y2 - y1;
        return x * x + y * y;
    }

    /**
     * Returns the distance between the specified points (See: {@link UMath.distSq})
     * @method
     * @static
     * @param {Number} x1 - The x of the first point
     * @param {Number} y1 - The y of the first point
     * @param {Number} x2 - The x of the second point
     * @param {Number} y2 - The y of the second point
     * @returns {Number} The distance between the two points
     */
    static dist(x1, y1, x2, y2) {
        return Math.sqrt(UMath.distSq(x1, y1, x2, y2));
    }

}

/**
 * @typedef {Object} Vec2Object - An object representation of a 2D Vector
 * @property {Number} x - The x component of the Vector
 * @property {Number} y - The y component of the Vector
 */

/**
 * A 2D Vector Class
 * @class
 */
UMath.Vec2 = class {

    /**
     * @constructor
     * @param {Number} [x] - The x component of the new Vector
     * @param {Number} [y] - The y component of the new Vector
     */
    constructor(x = 0, y = 0) {
        this.x = x;
        this.y = y;
    }

    /**
     * Creates a new Vector that is equal to this
     * @method
     * @returns {UMath.Vec2} A copy of this Vector
     */
    copy() {
        return new UMath.Vec2(this.x, this.y);
    }

    /**
     * Returns this Vector as a String (e.g. "(0, 0)")
     * (See {@link UMath.Vec2.fromString} to get a Vector from a String)
     * @method
     * @returns {String} This Vector as a String
     */
    toString() {
        return `(${this.x}, ${this.y})`;
    }

    /**
     * Returns the squared magnitude of the Vector (See {@link UMath.Vec2#mag})
     * @method
     * @returns {Number} The squared magnitude
     */
    magSq() {
        return this.x * this.x + this.y * this.y;
    }

    /**
     * Returns the magnitude of the Vector (See {@link UMath.Vec2#magSq})
     * @method
     * @returns {Number} The magnitude
     */
    mag() {
        return Math.sqrt(this.magSq());
    }

    /**
     * Returns the squared distance between this and the specified Vector (See {@link UMath.Vec2#dist})
     * @method
     * @param {UMath.Vec2|Vec2Object} other - The other Vector
     * @returns {Number} The squared distance between the two vectors
     */
    distSq(other) {
        return UMath.distSq(this.x, this.y, other.x, other.y);
    }

    /**
     * Returns the distance between this and the specified Vector (See {@link UMath.Vec2#distSq})
     * @method
     * @param {UMath.Vec2|Vec2Object} other - The other Vector
     * @returns {Number} The distance between the two vectors
     */
    dist(other) {
        return UMath.dist(this.x, this.y, other.x, other.y);
    }

    /**
     * Calculates the dot product between this and the specified Vector
     * @param {UMath.Vec2} other - The other Vector to calculate the dot product with
     * @returns {Number} The dot product between this and the specified Vector
     */
    dot(other) {
        return this.x * other.x + this.y * other.y;
    }

    /**
     * Calculates the Z value of the 3D cross product Vector between this and the specified Vector
     * @param {UMath.Vec2} other - The other Vector to calculate the cross product with
     * @returns {Number} The Z value of the 3D cross product Vector
     */
    cross(other) {
        return this.x * other.y - this.y * other.x;
    }
    
    /**
     * Adds the specified Vector or scalar to this
     * (See {@link UMath.Vec2.add} for a static version of this method)
     * @method
     * @param {Number|UMath.Vec2|Vec2Object} other - The Vector or scalar to add
     * @returns {UMath.Vec2} this
     */
    add(other) {
        if (typeof other === "object") {
            this.x += other.x;
            this.y += other.y;
        } else {
            this.x += other;
            this.y += other;   
        }
        return this;
    }

    /**
     * Subtracts the specified Vector or scalar to this
     * (See {@link UMath.Vec2.sub} for a static version of this method)
     * @method
     * @param {Number|UMath.Vec2|Vec2Object} other - The Vector or scalar to subtract
     * @returns {UMath.Vec2} this
     */
    sub(other) {
        if (typeof other === "object") {
            this.x -= other.x;
            this.y -= other.y;
        } else {
            this.x -= other;
            this.y -= other;   
        }
        return this;
    }

    /**
     * Multiplies this by the specified scalar
     * (See {@link UMath.Vec2.mul} for a static version of this method)
     * @method
     * @param {Number} other - The scalar to add
     * @returns {UMath.Vec2} this
     */
    mul(scalar) {
        this.x *= scalar;
        this.y *= scalar;
        return this;
    }

    /**
     * Divides this by the specified scalar
     * (See {@link UMath.Vec2.div} for a static version of this method)
     * @method
     * @param {Number} other - The scalar to add
     * @returns {UMath.Vec2} this
     */
    div(scalar) {
        this.x /= scalar;
        this.y /= scalar;
        return this;
    }

    /**
     * Rotates this by the specified angle
     * (See {@link UMath.Vec2.rotate} for a static version of this method)
     * @method
     * @param {Number} angle - The angle to rotate this Vector by
     * @returns {UMath.Vec2} this
     */
    rotate(angle) {
        const cos = Math.cos(angle);
        const sin = Math.sin(angle);
        const newX = cos * this.x - sin * this.y;
        const newY = sin * this.x + cos * this.y;
        this.x = newX;
        this.y = newY;
        return this;
    }

    /**
     * Makes the magnitude of this Vector equal to 1
     * (See {@link UMath.Vec2.normalize} for a static version of this method)
     * @method
     * @returns {UMath.Vec2} this
     */
    normalize() {
        return this.div(this.mag());
    }

    /**
     * Returns a new Vector parsed from the specified String (of type "x,y", it removes parenthesis and extra spaces automatically)
     * (See {@link UMath.Vec2#toString} to get a String from a Vector)
     * @method
     * @static
     * @param {String} str - The String to parse
     * @returns {UMath.Vec2} The Vector parsed from the String
     */
    static fromString(str) {
        const components = str.replace(/[( )]/g, "").split(",");
        const [x, y] = [parseInt(components[0]), parseInt(components[1])];

        return new UMath.Vec2(Number.isNaN(x) ? undefined : x, Number.isNaN(y) ? undefined : y);
    }

    /**
     * Returns a new Vector which is the sum of the two specified elements
     * (See {@link UMath.Vec2#add} for a non-static version of this method)
     * @method
     * @static
     * @param {UMath.Vec2|Vec2Object} v - The Vector to add to
     * @param {Number|UMath.Vec2|Vec2Object} other - The Vector or scalar to add
     * @returns {UMath.Vec2} The sum of the two elements
     */
    static add(v, other) {
        if (typeof other === "object") {
            return new UMath.Vec2(v.x + other.x, v.y + other.y);
        }
        return new UMath.Vec2(v.x + other, v.y + other);
    }

    /**
     * Returns a new Vector which is the subtraction of the two specified elements
     * (See {@link UMath.Vec2#sub} for a non-static version of this method)
     * @method
     * @static
     * @param {UMath.Vec2|Vec2Object} v - The Vector to subtract from
     * @param {Number|UMath.Vec2|Vec2Object} other - The Vector or scalar to subtract
     * @returns {UMath.Vec2} The subtraction of the two elements
     */
    static sub(v, other) {
        if (typeof other === "object") {
            return new UMath.Vec2(v.x - other.x, v.y - other.y);
        }
        return new UMath.Vec2(v.x - other, v.y - other);
    }

    /**
     * Returns a new Vector which is the multiplication of the specified Vector by the specified scalar
     * (See {@link UMath.Vec2#mul} for a non-static version of this method)
     * @method
     * @static
     * @param {UMath.Vec2|Vec2Object} v - The Vector to multiply
     * @param {Number} scalar - The scalar to multiply the Vector by
     * @returns {UMath.Vec2} The multiplication between the specified Vector and the scalar
     */
    static mul(v, scalar) {
        return new UMath.Vec2(v.x * scalar, v.y * scalar);
    }

    /**
     * Returns a new Vector which is the division of the specified Vector by the specified scalar
     * (See {@link UMath.Vec2#div} for a non-static version of this method)
     * @method
     * @static
     * @param {UMath.Vec2|Vec2Object} v - The Vector to divide
     * @param {Number} scalar - The scalar to divide the Vector by
     * @returns {UMath.Vec2} The division between the specified Vector and the scalar
     */
    static div(v, scalar) {
        return new UMath.Vec2(v.x / scalar, v.y / scalar);
    }

    /**
     * Returns a new Vector equal to the specified Vector rotated by the specified angle
     * (See {@link UMath.Vec2#rotate} for a non-static version of this method)
     * @method
     * @param {UMath.Vec2|Vec2Object} v - The Vector to rotate
     * @param {Number} angle - The angle to rotate the specified Vector by
     * @returns {UMath.Vec2} A new Vector equal to the specified Vector rotated by the specified angle
     */
    static rotate(v, angle) {
        const cos = Math.cos(angle);
        const sin = Math.sin(angle);
        return new UMath.Vec2(cos * v.x - sin * v.y, sin * v.x + cos * v.y);
    }

    /**
     * Returns a new Vector which is the specified one with a magnitude of 1
     * (See {@link UMath.Vec2#normalize} for a non-static version of this method)
     * @method
     * @static
     * @param {UMath.Vec2|Vec2Object} v - The Vector to normalize
     * @returns {UMath.Vec2} The normalized equivalent of the specified Vector
     */
    static normalize(v) {
        const magnitude = Math.sqrt(v.x * v.x + v.y * v.y);
        return new UMath.Vec2(v.x / magnitude, v.y / magnitude);
    }

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
 * @typedef {Object} RectConfig - Rectangles' config
 * @property {Boolean} [noStroke] - Whether or not stroke should be applied
 * @property {Boolean} [noFill] - Whether or not the shape should be filled
 * @property {Object} [rounded] - If not undefined the rectangle will be drawn as if it has round corners and its x and y will be the center of it
 * @property {Array<Boolean>} [rounded.corners] - Corners that should be drawn (clockwise starting from the top-left one), if undefined all corners will be drawn
 * @property {Array<Number>} [rounded.radius] - Percentage of how rounded a corner should be (1 means the whole width/height, going over 1 may result in strange shapes), if undefined it defaults to 1
 */

/**
 * @typedef {Object} PathConfig - Paths' config
 * @property {Boolean} [noStroke] - Whether or not stroke should be applied
 * @property {Boolean} [noFill] - Whether or not the shape should be filled
 * @property {Boolean} [round] - Whether or not corners should be round
 */

/**
 * @typedef {Object} TextConfig - Texts' config
 * @property {"left"|"center"|"right"} [horizontalAlignment] - Where the text should be aligned horizontally
 * @property {"top"|"center"|"bottom"} [verticalAlignment] - Where the text should be aligned vertically
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
     * @constructor
     * @default
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

        const onResize = (...args) => {
            // If the user didn't specify a callback on window resize
            if (config.onResize === undefined) {
                // If a width and a height were given then use them as the width and height
                if (config.width !== undefined && config.height !== undefined) {
                    this.canvas.width = config.width;
                    this.canvas.height = config.height;
                } else {
                    // Otherwise make the canvas fullscreen
                    this.canvas.width = window.innerWidth + 1;
                    this.canvas.height = window.innerHeight + 1;
                }
            } else {
                // Call the user-specified callback
                config.onResize(this, ...args);
            }
        }

        onResize();

        // Add an event listener to the resize event
        window.addEventListener("resize", onResize);

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
     * (Using `{@link wCanvas#context}#save` is better if you don't need to save the context multiple times)
     * @method
     * @default
     * @param {Number} [n] - How many times the context should be saved
     * @returns {undefined}
     */
    save(n = 1) {
        if (n > 1) {
            for (let i = 0; i < n; i++) {
                this.context.save();
            }
        } else {
            this.context.save();
        }
    }

    /**
     * Restores canvas context from last save
     * (Using `{@link wCanvas#context}#restore` is better if you don't need to restore the context multiple times)
     * @method
     * @default
     * @param {Number} [n] - How many times the context should be restored
     * @returns {undefined}
     */
    restore(n = 1) {
        if (n > 1) {
            for (let i = 0; i < n; i++) {
                this.context.restore();
            }
        } else {
            this.context.restore();
        }
    }

    /**
     * Translates every next shape by the specified offset
     * (Using `{@link wCanvas#context}#translate` is better if you don't need the default values)
     * @method
     * @default
     * @param {Number} [x] - X translation
     * @param {Number} [y] - Y translation (Same as X if `undefined`)
     * @returns {undefined}
     */
    translate(x = 0, y) {
        this.context.translate(x, y === undefined ? x : y);
    }
    
    /**
     * Rotates every next shape by the specified angle in radians
     * (Using `{@link wCanvas#context}#rotate` is better if you don't need the default values)
     * @method
     * @default
     * @param {Number} [angle] - Angle in radians
     * @returns {undefined}
     */
    rotate(angle = 0) {
        this.context.rotate(angle);
    }

    /**
     * Scales every next shape by the specified values
     * (Using `{@link wCanvas#context}#scale` is better if you don't need the default values)
     * @method
     * @default
     * @param {Number} [x] - Horizontal Scale
     * @param {Number} [y] - Vertical Scale (Same as X if `undefined`)
     * @returns {undefined}
     */
    scale(x = 1, y) {
        this.context.scale(x, y === undefined ? x : y);
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
     * Draws a rectangle that fills the entire canvas using the specified color
     * @method
     * @default
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
     * Draws a rectangle that fills the entire canvas using the specified CSS color
     * @method
     * @default
     * @param {CanvasFillStrokeStyles} [color] - A CSS valid color
     * @returns {undefined}
     */
    backgroundCSS(color = "black") {
        this.context.save();
        
        this.context.resetTransform();
        this.context.fillStyle = color;
        this.rect(0, 0, this.canvas.width, this.canvas.height, { "noStroke": true });
        
        this.context.restore();
    }

    /**
     * Sets the color to be used to fill shapes
     * @method
     * @default
     * @param {Number} [r] - Red [0, 255]
     * @param {Number} [g] - Green [0, 255]
     * @param {Number} [b] - Blue [0, 255]
     * @returns {undefined}
     */
    fill(r = 255, g = 255, b = 255) {
        this.context.fillStyle = "rgb(" + [r, g, b].join(", ") + ")";
    }

    /**
     * Sets the color to be used to fill shapes using a CSS color
     * (Setting `{@link wCanvas#context}#fillStyle` is better if you don't need the default values)
     * @method
     * @default
     * @param {CanvasFillStrokeStyles} [color] - A CSS valid color
     * @returns {undefined}
     */
    fillCSS(color = "white") {
        this.context.fillStyle = color;
    }

    /**
     * Sets the color to be used for shapes contours
     * @method
     * @default
     * @param {Number} [r] - Red [0, 255]
     * @param {Number} [g] - Green [0, 255]
     * @param {Number} [b] - Blue [0, 255]
     * @returns {undefined}
     */
    stroke(r = 0, g = 0, b = 0) {
        this.context.strokeStyle = "rgb(" + [r, g, b].join(", ") + ")";
    }

    /**
     * Sets the color to be used for shapes contours using a CSS color
     * (Setting `{@link wCanvas#context}#strokeStyle` is better if you don't need the default values)
     * @method
     * @default
     * @param {CanvasFillStrokeStyles} [color] - A CSS valid color
     * @returns {undefined}
     */
    strokeCSS(color = "black") {
        this.context.strokeStyle = color;
    }

    /**
     * Changes stroke diameter
     * (Setting `{@link wCanvas#context}#lineWidth` is better if you don't need the default values)
     * @method
     * @default
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
     * @param {RectConfig} [config] - Other options
     * @returns {undefined}
     */
    rect(x, y, w, h, config = {}) {
        if (config.rounded) {

            const radiusPixels = Math.min(w, h) / 2 * ( config.rounded.radius === undefined ? 1 : config.rounded.radius );
            const corners = config.rounded.corners === undefined ? [ true, true, true, true ] : config.rounded.corners;
    
            const topLeftX = x - w / 2;
            const topLeftY = y - h / 2;
            const halfWidth = (w - radiusPixels * 2) / 2;
            const halfHeight = (h - radiusPixels * 2) / 2;
    
            this.context.beginPath();
            
            // Corners are drawn clockwise
            // Corners don't end at the center of the rectangle, so if only the two opposite corners are enabled the shape is going to be weird
            // Top-left corner
            if (corners[0]) {
                this.context.lineTo(topLeftX, topLeftY + radiusPixels + halfHeight);
                this.context.lineTo(topLeftX, topLeftY + radiusPixels);
                this.context.quadraticCurveTo(topLeftX, topLeftY, topLeftX + radiusPixels, topLeftY);
                this.context.lineTo(topLeftX + radiusPixels + halfWidth, topLeftY);
            }
    
            // Top-right corner
            if (corners[1]) {
                this.context.lineTo(topLeftX + radiusPixels + halfWidth, topLeftY);
                this.context.lineTo(topLeftX + radiusPixels + halfWidth * 2, topLeftY);
                this.context.quadraticCurveTo(topLeftX + w, topLeftY, topLeftX + w, topLeftY + radiusPixels);
                this.context.lineTo(topLeftX + w, topLeftY + radiusPixels + halfHeight);
            }
    
            // Bottom-right corner
            if (corners[2]) {
                this.context.lineTo(topLeftX + w, topLeftY + radiusPixels + halfHeight);
                this.context.lineTo(topLeftX + w, topLeftY + radiusPixels + halfHeight * 2);
                this.context.quadraticCurveTo(topLeftX + w, topLeftY + h, topLeftX + radiusPixels + halfWidth * 2, topLeftY + h);
                this.context.lineTo(topLeftX + radiusPixels + halfWidth, topLeftY + h);
            }
    
            // Bottom-left corner
            if (corners[3]) {
                this.context.lineTo(topLeftX + radiusPixels + halfWidth, topLeftY + h);
                this.context.lineTo(topLeftX + radiusPixels, topLeftY + h);
                this.context.quadraticCurveTo(topLeftX, topLeftY + h, topLeftX, topLeftY + radiusPixels + halfHeight * 2);
                this.context.lineTo(topLeftX, topLeftY + radiusPixels + halfHeight);
            }
    
            this.context.closePath();

            if (!config.noFill) {
                this.context.fill();
            }
    
            if (!config.noStroke) {
                this.context.stroke();
            }

        } else {
            if (!config.noFill) {
                this.context.fillRect(x, y, w, h);
            }
    
            if (!config.noStroke) {
                this.context.strokeRect(x, y, w, h);
            }
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
     * @param {Number} [rY] - The radius on the y axis of the ellipse (Same as rX if `undefined`)
     * @param {ShapeConfig} [config] - Other options
     * @returns {undefined}
     */
    ellipse(x, y, rX, rY, config = {}) {
        this.context.beginPath();

        this.context.ellipse(x, y, rX, rY === undefined ? rX : rY, 0, 0, Math.PI * 2);
        
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
     * @default
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
     * @param {Array<Array<Number>>|Array<UMath.Vec2>|Array<Vec2Object>} vertices - Array of Vertices (A vertex is this kind of array [x, y])
     * @param {PathConfig} [config] - Other options
     * @returns {undefined}
     */
    path(vertices, config = {}) {
        if (vertices.length <= 1) {
            return;
        }

        this.context.beginPath();

        const firstVertex = vertices[0];
        const isVec2Array = !Array.isArray(firstVertex);

        if (isVec2Array) {
            this.context.moveTo(firstVertex.x, firstVertex.y);
        } else {
            this.context.moveTo(firstVertex[0], firstVertex[1]);
        }

        for (let i = 1; i < vertices.length; i++) {
            const vertex = vertices[i];
            if (isVec2Array) {
                this.context.lineTo(vertex.x, vertex.y);
            } else {
                this.context.lineTo(vertex[0], vertex[1]);
            }
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
     * @default
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
        const textMeasures =
            config.returnWidth || config.horizontalAlignment === "center" || config.horizontalAlignment === "right"
                               || config.verticalAlignment   === "center" || config.verticalAlignment   === "bottom"
            ? this.context.measureText(text) : undefined
        ;
        
        switch (config.horizontalAlignment) {
            case "center": {
                x -= textMeasures.width / 2;
                break;
            }
            case "right": {
                x -= textMeasures.width;
                break;
            }
        }

        switch (config.verticalAlignment) {
            case "center": {
                y += (textMeasures.actualBoundingBoxAscent + textMeasures.actualBoundingBoxDescent) / 2;
                break;
            }
            case "bottom": {
                y += textMeasures.actualBoundingBoxAscent + textMeasures.actualBoundingBoxDescent;
                break;
            }
        }

        if (!config.noFill) {
            this.context.fillText(text, x, y, config.maxWidth);
        }

        if (!(config.noStroke || config.noStroke === undefined)) {
            this.context.strokeText(text, x, y, config.maxWidth);
        }

        if (config.returnWidth) {
            return textMeasures.width;
        }
    }
}
