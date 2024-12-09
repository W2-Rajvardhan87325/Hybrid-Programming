var x1 = 0;
var y1 = 0;
var x2 = 0;
var y2 = 0;

function Draw() {
    setInterval(KeepDrawing, 500);
}

function KeepDrawing() {
    var refToCanvas = document.getElementById("canvaDesign");
    var context = refToCanvas.getContext("2d");

    context.moveTo(x1, y1);
    x2 = x1 + 10;
    y2 = Math.floor(Math.random() * 130);
    context.arcTo(x1 + 50, y1, x2 + 50, y2, y2);
    context.stroke();

    x1 = x2;
    y1 = y2;

}