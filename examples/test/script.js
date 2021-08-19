
import * as wcanvas from "../../wcanvas.js";

window.addEventListener("load", () => {
    const FONT = new wcanvas.Font("Times New Roman", 12);
    const COLOR_BLACK = new wcanvas.Color("black");

    const wrappedCanvas = new wcanvas.wCanvas({
        "onSetup": (canvas) => {
            console.log("WCanvas Version: " + wcanvas.version);
            console.log("Canvas ID: " + canvas.element.id);

            canvas.startLoop();
        },
        "onDraw": (canvas, deltaTime) => {
            // console.log("Frame Time: " + deltaTime);

            canvas.background(COLOR_BLACK);
            canvas.translate(100 * Math.SQRT2, 0);
            canvas.rotate(Math.PI / 4);
            canvas.scale(2, 2);
            
            canvas.fill(0, 0, 255);
            canvas.rect(0, 0, 100, 100, { "noStroke": true, "rounded": { "radius": 0.5 } });

            canvas.fill();
            canvas.ellipse(50, 50, 50, undefined, { "noStroke": true });
            
            canvas.stroke(255, 0, 0);
            canvas.strokeWeight(4);
            canvas.line(0, 0, 100, 100);

            canvas.rotate(-Math.PI / 4);
            canvas.textFont(FONT);
            canvas.textSize(20);
            const textWidth = canvas.text(
                "This is a cool text", 100, 100,
                { "returnWidth": true, "alignment": { "vertical": "bottom" } }
            );

            canvas.path(
                0, 0,
                [[100, 100],
                 [100 + textWidth, 100],
                 [100 + textWidth / 2, 200]],
                { "noFill": false, "noStroke": true, "round": true }
            );
        }
    });
});
