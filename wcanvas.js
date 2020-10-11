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

export const version = "0.0.2";

let uuid = 0;
export const generateUUID = () => { return uuid++; }

/**
 * @typedef wcanvasConfig - wCanvas' config
 * @property {String} id - The id of the canvas you want to wrap
 * @property {HTMLCanvasElement} canvas - The canvas you want to wrap
 * @property {Number} width - The width of the canvas
 * @property {Number} height - The height of the canvas
 * @property {(this: wcanvas, window: Window, event: UIEvent) => {}} onResize - A callback that's called on window resize
 */

export class wcanvas {
    /**
     * @param {wcanvasConfig} config
     */
    constructor(config) {
        config = config === undefined ? {} : config;

        if (config.canvas === undefined) {
            if (config.id === undefined) {
                this.canvas = document.createElement("canvas");
                this.canvas.id = String(generateUUID());
                document.body.appendChild(this.canvas);
            } else {
                /**
                 * @type {HTMLCanvasElement}
                 */
                this.canvas = document.getElementById(config.id);
            }
        } else {
            this.canvas = config.canvas;
        }

        this.context = this.canvas.getContext("2d");

        if (config.onResize === undefined) {
            if (config.width === undefined || config.height === undefined) {
                const onResize = () => {
                    this.canvas.width = window.innerWidth;
                    this.canvas.height = window.innerHeight;
                }

                window.addEventListener("resize", onResize);
                onResize();
            } else {
                this.canvas.width = config.width;
                this.canvas.height = config.height;
            }
        } else {
            window.addEventListener("resize", (window, event) => {
                config.onResize(this, window, event);
            });
        }
    }
}
