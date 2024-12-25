export const initialRadius = 25;

const actionNew    = Symbol("actionNew");
const actionAdjust = Symbol("actionAdjust");

export class CircleDrawer {
    constructor() {
        this.circles   = [];
        this.selected  = -1;
        this.actions   = [];
        this.oldRadius = null;
        this.undone    = [];
    }

    onCanvasClick(event) {
        const canvas = event.currentTarget;
        const x      = event.offsetX;
        const y      = event.offsetY;

        let circleIndex = this.findCircle(x, y);

        this.resetSelected(canvas);

        if (circleIndex === -1) {
            const newCircle = { x, y, radius: initialRadius };
            drawCircle(canvas, newCircle);
            
            circleIndex = this.circles.length;
            this.circles.push(newCircle);
            
            this.actions.push({ kind: actionNew, circle: null });
            this.undone = [];
        } else {
            this.select(circleIndex);
        }

        this.updateDiameterPopup();
    }

    onDiameterInput(event) {    
        const radius = event.target.value;

        const canvas  = document.getElementById("canvas");
        const current = canvas.children[this.selected];
        current.setAttribute("r", radius);
        
        const circle = this.circles[this.selected];
        if (this.oldRadius === null) {
            this.oldRadius = circle.radius;
        }
        circle.radius = parseFloat(radius);
    }

    onDiameterChange() {
        const action = {
            kind      : actionAdjust  ,
            target    : this.selected ,
            oldRadius : this.oldRadius,
        };
        this.actions.push(action);
        this.oldRadius = null;
        this.undone    = [];
    }

    updateDiameterPopup() {
        const diameterPopup            = document.getElementById("diameterPopup");
        diameterPopup.style.visibility = this.selected === -1 ? "hidden" : "visible";
        
        if (this.selected !== -1) {
            const circle = this.circles[this.selected];

            const diameterLabel       = document.getElementById("diameterLabel");
            diameterLabel.textContent = `Adjust the diameter of circle at (${circle.x}, ${circle.y}).`;

            const diameterSlider = document.getElementById("diameterSlider");
            diameterSlider.value = circle.radius;
        }
    }

    resetSelected(canvas) {
        if (this.selected !== -1) {
            const previous = canvas.children[this.selected];
            previous.setAttribute("fill", "none");
            this.selected = -1;
        }

        const diameterPopup  = document.getElementById("diameterPopup");
        diameterPopup.hidden = true;
    }

    select(circleIndex) {
        const current = canvas.children[circleIndex];
        current.setAttribute("fill", "lightgrey");
        this.selected = circleIndex;
    }

    findCircle(x, y) {
        for (let i = 0; i < this.circles.length; i++) {
            const circle = this.circles[i];
            const dx     = x - circle.x;
            const dy     = y - circle.y;
            if (dx * dx + dy * dy <= circle.radius * circle.radius) {
                return i;
            }
        }
        return -1;
    }

    undo() {
        if (this.actions.length > 0) {
            const action  = this.actions.pop();
            const reverse = this.perform(action);
            this.undone.push(reverse);
        }
    }

    redo() {
        if (this.undone.length > 0) {
            const reverse = this.undone.pop();
            this.perform(reverse);
        }
    }

    perform(action) {
        console.log({ actions: this.actions, undone: this.undone });
        const canvas  = document.getElementById("canvas");
        let   reverse = null;
        
        if (action.kind === actionNew) {
            if (action.circle === null) {
                if (this.selected === this.circles.length - 1) {
                    this.selected = -1;
                    
                    const diameterPopup            = document.getElementById("diameterPopup");
                    diameterPopup.style.visibility = "hidden";
                }
            
                canvas.removeChild(canvas.lastElementChild);
                const removed = this.circles.pop();

                reverse = { kind: actionNew, circle: removed };
            }
            
            else {
                this.circles.push(action.circle);
                drawCircle(canvas, action.circle);
                reverse = { kind: actionNew };
            }
        }

        else if (action.kind === actionAdjust) {
            const target = action.target;
            const radius = action.oldRadius;

            const circle = this.circles[target];
            reverse      = { kind: actionAdjust, target, radius: circle.radius };
            
            canvas.children[target].setAttribute("r", radius);
            circle.radius = radius;

            if (target === this.selected) {
                const diameterSlider = document.getElementById("diameterSlider");
                diameterSlider.value = radius;
            }
        }

        return reverse;
    }
}

function drawCircle(canvas, circle) {
    const element = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    element.setAttribute("cx"          , circle.x);
    element.setAttribute("cy"          , circle.y);
    element.setAttribute("r"           , circle.radius);
    element.setAttribute("stroke"      , "black");
    element.setAttribute("stroke-width", 1);
    element.setAttribute("fill"        , "none");

    canvas.appendChild(element);
}
