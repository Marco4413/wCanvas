
import * as wcanvas from "../wcanvas.js";

window.addEventListener("load", () => {
    console.log(wcanvas.version);

    const wrappedCanvas = new wcanvas.wcanvas();

    wrappedCanvas.context.fillStyle = "blue";
    wrappedCanvas.context.fillRect(10, 10, 100, 100);
});
