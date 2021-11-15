
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
Sure, you can check it out at [https://hds536jhmk.github.io/wCanvas-docs/](https://hds536jhmk.github.io/wCanvas-docs/)

### Are there any scripts that use this library?

Yup, sure there are!

Here's the list of all official scripts that are using this library:
 - [Audio Responsive Avatar](https://steamcommunity.com/sharedfiles/filedetails/?id=2225740349) (A Wallpaper Engine wallpaper. Tho the library was modified to not use ES6 modules)
 - [Tetris_wCanvas](https://github.com/hds536jhmk/Tetris_wCanvas)
 - [PFVisualizer](https://github.com/hds536jhmk/PFVisualizer) (A Path Finding Algorithm Visualizer)
 - [KarnaughMaps](https://github.com/hds536jhmk/KarnaughMaps) (A tool to visualize Karnaugh Maps)
 - [MineSweeper](https://github.com/hds536jhmk/MineSweeper)
 - [GameOfLife](https://github.com/hds536jhmk/GameOfLife) (Conway's Game Of Life)
