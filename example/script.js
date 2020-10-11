
import * as wcanvas from "../wcanvas.js";

window.addEventListener("load", () => {
    let time = 0;

    const wrappedCanvas = new wcanvas.wcanvas({
        "onSetup": (canvas) => {
            console.log("WCanvas Version: " + wcanvas.version);
            console.log("Canvas ID: " + canvas.canvas.id);

            canvas.startLoop();
        },
        "onDraw": (canvas, deltaTime) => {
            time += deltaTime;
            if (time >= 5) {
                canvas.stopLoop();
                console.log("Last Frame!");
            }

            console.log("Frame Time: " + deltaTime);
            canvas.context.fillStyle = "blue";
            canvas.context.fillRect(10, 10, 100, 100);
        }
    });
});
