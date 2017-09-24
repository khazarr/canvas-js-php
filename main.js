const canvas = document.querySelector('#draw');
const ctx = canvas.getContext('2d');
// canvas.width = window.innerWidth;
// canvas.height = window.innerHeight;

ctx.strokeStyle = '#BADA55';
ctx.lineJoin = 'round';
ctx.lineCap = 'round';
ctx.lineWidth = 50;

let isDrawing = false;
let lastX = 0;
let lastY = 0;
let hue = 0;
let direction = true;



function draw(e) {
  if (!isDrawing) return;
  console.log(e);

  ctx.strokeStyle = `hsl(${hue},100%, 50%)`;
  ctx.beginPath();
  //start from
  ctx.moveTo(lastX, lastY);
  // move to
  ctx.lineTo(e.offsetX, e.offsetY);
  ctx.stroke();

  // lastX = e.offsetX;
  // lastY = e.offsetY;
  // ES6 style
  [lastX, lastY] = [e.layerX, e.layerY];
  hue >= 359 ? hue = 0 : hue++;

  if(ctx.lineWidth >= 100 || ctx.lineWidth <= 1){
    direction = !direction;
  }

  direction ? ctx.lineWidth++ : ctx.lineWidth--;
}

canvas.addEventListener('mousedown', (e) => {
  isDrawing = true;
  [lastX, lastY] = [e.layerX, e.layerY];
  console.log(e);
});
canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mouseup', () => isDrawing = false);
canvas.addEventListener('mouseout', () => isDrawing = false);
