var lib = {}

lib.totalAs = 0

lib.mousealert = function(e) {
  for(var i = 0; i < lib.totalAs; i++){
    var pos = lib.getRandomPointOnCircle()
    var a1 = new lib.LetterA(pos, 1);
    console.log("click" + a1.pos);
    a1.render()
  }
  lib.totalAs++;
  // console.log("click" + a1.pos);
  // lib.fall(a1)
  // var c = lib.canvas
  // c.clearRect(0, 0, canvas.width, canvas.height);
  // var a1 = new lib.LetterA([e.pageX, e.pageY], 4);
  // lib.fall(a1)
}
document.onmousedown = lib.mousealert;

lib.fall = function(subject, moved) {
  var moved = moved || 0
  // console.log(moved + " moved");
  var c = lib.canvas;
  c.clearRect(0, 0, canvas.width, canvas.height);
  subject.move(moved, moved)
  moved++;
  // console.log(moved + " after moved");
  subject.render(c)
  lib.drawPageConstants()
  // console.log("pos "+subject.pos[0])
  if(subject.pos[0] < 800){
    requestAnimationFrame(function(){
      lib.fall(subject, moved)
    })
  }
}

lib.fall_to = function(subject, moved, destination) {
  // var moved = moved || 0
  var move = [0, 0]
  if (destination[0] > subject.pos[0]){
    
  }
  // console.log(moved + " moved");
  var c = lib.canvas;
  c.clearRect(0, 0, canvas.width, canvas.height);
  subject.move(moved, moved)
  moved++;
  // console.log(moved + " after moved");
  subject.render(c)
  lib.drawPageConstants()
  // console.log("pos "+subject.pos[0])
  if(subject.pos[0] < 800){
    requestAnimationFrame(function(){
      lib.fall_to(subject, moved, destination)
    })
  }
}

lib.drawPageConstants = function() {
  var c = lib.canvas
  var a1 = new lib.LetterA([100, 100], 4);
  a1.render(c);
};

lib.getRandomPointOnCircle = function() {
  var center = [300, 300]
  var radius = 200;
  var angle = Math.random()*Math.PI*2;
  var x = Math.cos(angle)*radius;
  var y = Math.sin(angle)*radius;
  return [x + center[0], y + center[1]]
}


lib.myAnimation = function(canvas){

  var c = canvas.getContext('2d');

  lib.canvas = c

  var a1 = new lib.LetterA([100, 100], 4);
  a1.render(c);

  var a2 = new lib.LetterA([200, 200], 9);
  a2.render(c);


  lib.fall(a2);

}



lib.LetterA = function(pos, size){
  this.size = size;
  this.pos = pos;
}

lib.LetterA.prototype.render = function (c) {
  var c = lib.canvas
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
