// init canvas
var canvas = $('canvas')
    , ctx = canvas[0].getContext('2d') // world
    , ctx2 = canvas[1].getContext('2d') // fog
    , ctx3 = canvas[2].getContext('2d') // chars
    , mDown = false
    , r1 = 30
    , r2 = 150
    , density = .8
    , hideOnMove = true
    , hideFill = 'rgba( 0, 0, 0, .8 )'
    , overlay = 'rgba( 0, 0, 0, 1 )'
    ;

if (!hideOnMove) {
    canvas.get(1).remove();
}

console.log(ctx3)

// black out the canvas
ctx.fillStyle = overlay;
ctx.fillRect(0, 0, 1280, 800);

// set up our "eraser"
ctx.globalCompositeOperation = 'destination-out';



$(document).ready(function() {
    makeElementsDraggable('.character');
});


function makeElementsDraggable(className) {
    $(className).draggable({
        start: function() {
            // Clear the area around the dragged element on dragging start
            // eraseAroundElement($(this));
        },
        drag: function() {
            // Clear the area around the dragged element while dragging
            eraseAroundElement($(this));
        },
        stop: function() {
            // Clear the area around the dragged element on dragging stop
            // eraseAroundElement($(this));
        }
    });
}



// canvas.last().on('mousemove', function (ev, ev2) {
function eraseAroundElement($element) {

    var elementRect = $element[0].getBoundingClientRect();

    // Calculate the center of the element
    var pX = elementRect.left + elementRect.width / 2;
    var pY = elementRect.top + elementRect.height / 2;


    // reveal wherever we drag
    var radGrd = ctx.createRadialGradient(pX, pY, r1, pX, pY, r2);
    radGrd.addColorStop(0, 'rgba( 0, 0, 0,  1 )');
    radGrd.addColorStop(density, 'rgba( 0, 0, 0, .1 )');
    radGrd.addColorStop(1, 'rgba( 0, 0, 0,  0 )');

    ctx.fillStyle = radGrd;
    ctx.fillRect(pX - r2, pY - r2, r2 * 2, r2 * 2);

    // partially hide the entire map and re-reval where we are now
    ctx2.globalCompositeOperation = 'source-over';
    ctx2.clearRect(0, 0, 1280, 800);
    ctx2.fillStyle = hideFill;
    ctx2.fillRect(0, 0, 1280, 800);

    var radGrd = ctx.createRadialGradient(pX, pY, r1, pX, pY, r2);
    radGrd.addColorStop(0, 'rgba( 0, 0, 0,  1 )');
    radGrd.addColorStop(.8, 'rgba( 0, 0, 0, .1 )');
    radGrd.addColorStop(1, 'rgba( 0, 0, 0,  0 )');

    ctx2.globalCompositeOperation = 'destination-out';
    ctx2.fillStyle = radGrd;
    ctx2.fillRect(pX - r2, pY - r2, r2 * 2, r2 * 2);

    // hide characters except where we can see.
    ctx3.clearRect(0, 0, 1280, 800);

    ctx3.globalCompositeOperation = 'source-over';
    ctx3.fillStyle = '#F00';
    for (var i = 0; i < 20; i++) {
        for (var j = 0; j < 20; j++) {
            ctx3.fillRect(i * 100, j * 100, 10, 10);
        }
    }

    // hide characters except for in the current location
    ctx3.globalCompositeOperation = 'destination-in';
    ctx3.fillStyle = radGrd;
    ctx3.fillRect(0, 0, 1280, 800);
};
// .trigger('mousemove', { pageX: 150, pageY: 150 });