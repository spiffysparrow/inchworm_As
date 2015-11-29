console.log("boo")

function myAnimation(canvas){

  var c = canvas.getContext('2d');
  var a1 = new LetterA([100, 100], 4);
  a1.render(c);

  var a2 = new LetterA([200, 200], 9);
  a2.render(c);
  a2.move(50, 50)
  a2.render(c)

}


function LetterA(pos, size){
  this.size = size;
  this.pos = pos;
}

LetterA.prototype.render = function (c) {
  console.log(c)
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


LetterA.prototype.move = function (dx, dy) {
  this.pos[0] += dx
  this.pos[1] += dy
};
