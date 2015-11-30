var lib = {}

lib.totalAs = 0

lib.mousealert = function(e) {
  console.log("--Total As " + lib.totalAs);
  var pos = lib.getRandomPointOnCircle()
  var a1 = new lib.LetterA([e.pageX, e.pageY], 1);
  console.log("click " + pos);
  lib.fall_to(a1, pos)
  lib.totalAs++;

}
document.onmousedown = lib.mousealert;

lib.fall = function(subject, moved) {
  var moved = moved || 0
  var c = lib.canvas;
  c.clearRect(0, 0, canvas.width, canvas.height);
  subject.move(moved, moved)
  moved++;
  subject.render(c)
  lib.drawPageConstants()
  if(subject.pos[0] < 800){
    requestAnimationFrame(function(){
      lib.fall(subject, moved)
    })
  }
}

lib.fall_to = function(subject, destination) {
  var move = [0, 0]
  if (destination[0] > subject.pos[0]){
    move[0] = 1
  }else{
    move[0] = -1
  }

  if (destination[1] > subject.pos[1]){
    move[1] = 1
  }else{
    move[1] = -1
  }

  // console.log("dest" + destination + " sub " + subject.pos);
  var closeEnough = Math.abs(destination[0] - subject.pos[0]) + Math.abs(destination[1] - subject.pos[1])
  if(closeEnough < 3){
    // console.log("here!!!")
    move = [0, 0]
    subject.pos = destination
    lib.pageConstants.push(subject)
    return
  }


  // console.log(move);
  var c = lib.canvas;
  c.clearRect(0, 0, canvas.width, canvas.height);
  subject.move(move[0], move[1])
  move++;
  subject.render(c)
  lib.drawPageConstants()
  if(move != [0,0]){
    requestAnimationFrame(function(){
      lib.fall_to(subject, destination)
    })
  }
}

lib.pageConstants = []

lib.drawPageConstants = function() {
  lib.pageConstants.forEach(function(item){
    var c = lib.canvas
    item.render(c)
  });
};

lib.getRandomPointOnCircle = function() {
  var center = [300, 300]
  var radius = 200;
  var angle = Math.random()*Math.PI*2;
  var x = Math.cos(angle)*radius;
  var y = Math.sin(angle)*radius;
  x = Math.round(x)
  y = Math.round(y)
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
