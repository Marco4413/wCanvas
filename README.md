
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
        "onDraw": (canvas, deltaTime) => { }
    });
});
```

### Is there a documentation available?

<!---
    Using an hyperlink with the same name as the URL
    to make JSDoc understand that it should be clickable
-->
Sure, you can check it out at [https://hds536jhmk.github.io/wCanvas/](https://hds536jhmk.github.io/wCanvas/)

### Are there any scripts made by using this library?

Yup, sure there are!

Here's the list of all official scripts that were made by using this library:
 - [Tetris_wCanvas](https://github.com/hds536jhmk/Tetris_wCanvas)
