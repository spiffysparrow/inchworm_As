var lib = {}

lib.mousealert = function(e) {
  console.log("click" + e.pageX);
  var c = lib.canvas
  c.clearRect(0, 0, canvas.width, canvas.height);
  var a1 = new lib.LetterA([e.pageX, e.pageY], 4);
  lib.animate(a1)
}
document.onmousedown = lib.mousealert;

lib.animate = function(subject, moved) {
  var moved = moved || 0
  console.log(moved + " moved");
  var c = lib.canvas;
  c.clearRect(0, 0, canvas.width, canvas.height);
  subject.move(moved, moved)
  moved++;
  console.log(moved + " after moved");
  subject.render(c)
  lib.drawPageConstants()
  console.log("pos "+subject.pos[0])
  if(subject.pos[0] < 800){
    requestAnimationFrame(function(){
      lib.animate(subject, moved)
    })
  }
}

lib.drawPageConstants = function() {
  var c = lib.canvas
  var a1 = new lib.LetterA([100, 100], 4);
  a1.render(c);
};


lib.myAnimation = function(canvas){

  var c = canvas.getContext('2d');

  lib.canvas = c

  var a1 = new lib.LetterA([100, 100], 4);
  a1.render(c);

  var a2 = new lib.LetterA([200, 200], 9);
  a2.render(c);


  lib.animate(a2);

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
