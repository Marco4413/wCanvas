
## wCanvas

### What does it mean?

Its meaning is really simple, it's "Canvas Wrapper"

### What does it do?

It wraps the canvas and makes it easier to have a draw loop and draw to the canvas by providing a bunch of useful functions.

### Am I allowed to use it?

Yes, you are. Provided that you keep the copyright notice on the library's file (Would be cool if it was also included in your main file too, but it's not mandatory)

### How do I use it?

It's as simple as this snippet of code:
```JavaScript
import { wCanvas } from "wcanvas.js";

window.addEventListener("load", () => {
    const wrappedCanvas = new wCanvas({
        "onSetup": (canvas) => {
            canvas.startLoop();
        },
        "onDraw": (canvas, deltaTime) => { }
    });
});
```
