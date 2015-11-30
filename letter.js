var lib = {}

lib.mousealert = function() {
  console.log("click");
  var c = lib.canvas
  c.clearRect(0, 0, canvas.width, canvas.height);
  var a1 = new lib.LetterA([100, 100], 4);
  a1.render(c);
}
document.onmousedown = lib.mousealert;


lib.myAnimation = function(canvas){

  var c = canvas.getContext('2d');

  lib.canvas = c

  var a1 = new lib.LetterA([100, 100], 4);
  a1.render(c);

  var a2 = new lib.LetterA([200, 200], 9);
  a2.render(c);


  var moved = 0

  var animate = function() {
    // console.log(moved + " moved");
    c.clearRect(0, 0, canvas.width, canvas.height);
    a2.move(moved, moved)
    moved++;
    a2.render(c)
    requestAnimationFrame(animate)
  }

  animate();

}


lib.LetterA = function(pos, size){
  this.size = size;
  this.pos = pos;
}

lib.LetterA.prototype.render = function (c) {
  c.fillStyle = "red";
  var x = this.pos[0]
  var y = this.pos[1]
  var size = this.size
  c.beginPath();
  c.moveTo(x, y);
  c.lineTo(x + 10 * size, y - 20 * size);
  c.lineTo(x + 20 * size, y);
  c.moveTo(x + 2.5 * size, y - 5 * size);
  c.lineTo(x + 20 * size, y - 5 * size);
  c.lineWidth = 4;
  c.strokeStyle = 'red';
  c.stroke();
};


lib.LetterA.prototype.move = function (dx, dy) {
  this.pos[0] += dx
  this.pos[1] += dy
};
