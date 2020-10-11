
import * as wcanvas from "../wcanvas.js";

window.addEventListener("load", () => {
    const wrappedCanvas = new wcanvas.wcanvas({
        "onSetup": (canvas) => {
            console.log("WCanvas Version: " + wcanvas.version);
            console.log("Canvas ID: " + canvas.canvas.id);
        },
        "onDraw": (canvas) => {
            canvas.context.fillStyle = "blue";
            canvas.context.fillRect(10, 10, 100, 100);
        }
    });

    setInterval(wrappedCanvas.draw, 16);
});
