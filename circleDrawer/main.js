import { initialRadius, CircleDrawer } from "./circleDrawer.js";

function main() {
    const circleDrawer = new CircleDrawer();
    
    const canvas = document.getElementById("canvas");
    canvas.addEventListener("mousedown", event => circleDrawer.onCanvasClick(event));
    canvas.addEventListener("contextmenu", event => event.preventDefault());

    const diameterPopup            = document.getElementById("diameterPopup");
    diameterPopup.style.visibility = "hidden";
    
    const diameterSlider = document.getElementById("diameterSlider");
    diameterSlider.addEventListener("input" , event => circleDrawer.onDiameterInput(event));
    diameterSlider.addEventListener("change", event => circleDrawer.onDiameterChange());
    diameterSlider.value = initialRadius;
    diameterSlider.max   = 2 * initialRadius;

    const undoButton = document.getElementById("undoButton");
    undoButton.addEventListener("click", event => circleDrawer.undo());

    const redoButton = document.getElementById("redoButton");
    redoButton.addEventListener("click", event => circleDrawer.redo());
}

document.addEventListener("DOMContentLoaded", main);
