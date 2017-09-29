const canvas = document.querySelector('#draw');
const ctx = canvas.getContext('2d');
// canvas.width = window.innerWidth;
// canvas.height = window.innerHeight;

const out1 = document.querySelector('#out1');
const ctx1 = out1.getContext('2d');
const out2 = document.querySelector('#out2');
const ctx2 = out2.getContext('2d');
const out3 = document.querySelector('#out3');
const ctx3 = out3.getContext('2d');

ctx.strokeStyle = '#BADA55';
ctx.lineJoin = 'round';
ctx.lineCap = 'round';
ctx.lineWidth = 10;

let isDrawing = false;
let lastX = 0;
let lastY = 0;
let hue = 0;
let direction = true;


// TO DO
// upload img
//user set thereshold


canvas.addEventListener('mousedown', (e) => {
  isDrawing = true;
  var position = getMousePos(canvas, e);
  [lastX, lastY] = [position.x, position.y];


  //console.log(e);
});
canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mouseup', () => isDrawing = false);
canvas.addEventListener('mouseout', () => isDrawing = false);


function getMousePos(canvas, evt) {
  var rect = canvas.getBoundingClientRect();
  return {
    x: (evt.clientX - rect.left) / (rect.right - rect.left) * canvas.width,
    y: (evt.clientY - rect.top) / (rect.bottom - rect.top) * canvas.height
  };
}






function draw(e) {
  if (!isDrawing) return;
  var position = getMousePos(canvas, e);

  ctx.strokeStyle = `hsl(${hue},100%, 50%)`;
  ctx.beginPath();
  //start from
  ctx.moveTo(lastX, lastY);
  // move to
  ctx.lineTo(position.x, position.y);
  ctx.stroke();

  //draw on other
  drawOnOther();

  [lastX, lastY] = [position.x, position.y];
  hue >= 359 ? hue = 0 : hue++;

  if (ctx.lineWidth >= 30 || ctx.lineWidth <= 1) {
    direction = !direction;
  }

  direction ? ctx.lineWidth++ : ctx.lineWidth--;
}


function grayScale(context, canvas) {
  let imgData = context.getImageData(0, 0, canvas.width, canvas.height);
  let pixels = imgData.data;
  for (let i = 0, n = pixels.length; i < n; i += 4) {
    var grayscale = pixels[i] * .3 + pixels[i + 1] * .59 + pixels[i + 2] * .11;
    pixels[i] = grayscale; // red
    pixels[i + 1] = grayscale; // green
    pixels[i + 2] = grayscale; // blue
    //pixels[i+3]              is alpha
  }
  //redraw the image in black & white
  ctx1.putImageData(imgData, 0, 0);
}

function invertColors(context, canvas) {
  let imgData = context.getImageData(0, 0, canvas.width, canvas.height);
  let pixels = imgData.data;
  for (let i = 0, n = pixels.length; i < n; i += 4) {
    pixels[i] = 255 - pixels[i]; // red
    pixels[i + 1] = 255 - pixels[i+1]; // green
    pixels[i + 2] = 255 - pixels[i+2]; // blue
    //pixels[i+3]              is alpha
  }
  //redraw the image in black & white
  ctx2.putImageData(imgData, 0, 0);

}

function theresholdImage(context, canvas,th) {
  let imgData = context.getImageData(0, 0, canvas.width, canvas.height);
  let pixels = imgData.data;
  for (let i = 0, n = pixels.length; i < n; i += 4) {

    var outth = (0.2126*pixels[i] + 0.7152*pixels[i + 1] + 0.0722*pixels[i + 2] >= th) ? 255 : 0;
    pixels[i] = pixels[i + 1] = pixels[i + 2] = outth;
  }
  //redraw the image in black & white
  ctx3.putImageData(imgData, 0, 0);

}

function drawOnOther() {
  ctx1.drawImage(canvas, 0, 0);
  grayScale(ctx,canvas);
  invertColors(ctx,canvas);
  theresholdImage(ctx,canvas,100);

}
