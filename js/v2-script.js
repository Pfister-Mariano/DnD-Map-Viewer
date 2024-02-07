<<<<<<< HEAD
window.addEventListener('resize', function(){
    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;
})

const canvas = document.getElementById('canvas')

canvas.height = window.innerHeight;
canvas.width = window.innerWidth;

const context = canvas.getContext('2d')

// fill canvas black
context.fillStyle = "blue";
context.fillRect(0, 0, canvas.width, canvas.height)

/******************************** drag function *********************************/

$(document).ready(function() {
    makeElementsDraggable('.character');
});

function makeElementsDraggable(className) {
    $(className).draggable({
        start: function() {
            // Clear the area around the dragged element on dragging start
            eraseAroundElement($(this));
        },
        drag: function() {
            // Clear the area around the dragged element while dragging
            eraseAroundElement($(this));
        },
        stop: function() {
            // Clear the area around the dragged element on dragging stop
            eraseAroundElement($(this));
        }
    });
}

function eraseAroundElement($element) {
    // Create a temporary canvas for handling transparency
    const tempCanvas = document.createElement('canvas');
    const tempContext = tempCanvas.getContext('2d');
    tempCanvas.width = canvas.width;
    tempCanvas.height = canvas.height;

    // Draw the original content of the main canvas to the temporary canvas
    tempContext.drawImage(canvas, 0, 0);

    // Get the position and size of the dragged element
    const elementRect = $element[0].getBoundingClientRect();

    // Calculate the center of the element
    const centerX = elementRect.left + elementRect.width / 2;
    const centerY = elementRect.top + elementRect.height / 2;

    // Set the global alpha to control the transparency on the temporary canvas
    tempContext.globalAlpha = 0.5;

    // Create a circular gradient with a 50px radius around the element on the temporary canvas
    const gradient = tempContext.createRadialGradient(centerX, centerY, 0, centerX, centerY, 50);
    gradient.addColorStop(0, 'rgba(0, 0, 0, 0.5)');
    gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');

    // Fill the circular gradient on the temporary canvas
    tempContext.fillStyle = gradient;
    tempContext.fillRect(0, 0, canvas.width, canvas.height);

    // Draw the content of the temporary canvas back to the main canvas
    context.drawImage(tempCanvas, 0, 0);
}
=======
window.addEventListener('resize', function(){
    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;
})

const canvas = document.getElementById('canvas')

canvas.height = window.innerHeight;
canvas.width = window.innerWidth;

const context = canvas.getContext('2d')

// fill canvas black
context.fillStyle = "blue";
context.fillRect(0, 0, canvas.width, canvas.height)

/******************************** drag function *********************************/

$(document).ready(function() {
    makeElementsDraggable('.character');
});

function makeElementsDraggable(className) {
    $(className).draggable({
        start: function() {
            // Clear the area around the dragged element on dragging start
            eraseAroundElement($(this));
        },
        drag: function() {
            // Clear the area around the dragged element while dragging
            eraseAroundElement($(this));
        },
        stop: function() {
            // Clear the area around the dragged element on dragging stop
            eraseAroundElement($(this));
        }
    });
}

function eraseAroundElement($element) {
    // Create a temporary canvas for handling transparency
    const tempCanvas = document.createElement('canvas');
    const tempContext = tempCanvas.getContext('2d');
    tempCanvas.width = canvas.width;
    tempCanvas.height = canvas.height;

    // Draw the original content of the main canvas to the temporary canvas
    tempContext.drawImage(canvas, 0, 0);

    // Get the position and size of the dragged element
    const elementRect = $element[0].getBoundingClientRect();

    // Calculate the center of the element
    const centerX = elementRect.left + elementRect.width / 2;
    const centerY = elementRect.top + elementRect.height / 2;

    // Set the global alpha to control the transparency on the temporary canvas
    tempContext.globalAlpha = 0.5;

    // Create a circular gradient with a 50px radius around the element on the temporary canvas
    const gradient = tempContext.createRadialGradient(centerX, centerY, 0, centerX, centerY, 50);
    gradient.addColorStop(0, 'rgba(0, 0, 0, 0.5)');
    gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');

    // Fill the circular gradient on the temporary canvas
    tempContext.fillStyle = gradient;
    tempContext.fillRect(0, 0, canvas.width, canvas.height);

    // Draw the content of the temporary canvas back to the main canvas
    context.drawImage(tempCanvas, 0, 0);
}
>>>>>>> master
