var lib = {}

lib.totalAs = 0

lib.mousealert = function(e) {
  console.log("--Total As " + lib.totalAs);
  var pos = lib.getRandomPointOnCircle()
  var angle = pos[2]
  pos = pos.slice(0, 2)
  var a1 = new lib.LetterA([e.pageX, e.pageY], 1);
  a1.angle = angle;
  var c = lib.canvas
  c.beginPath();
  c.moveTo(e.pageX, e.pageY)
  c.lineTo(pos[0], pos[1]);
  c.lineWidth = 4;
  c.strokeStyle = 'red';
  c.stroke();
  lib.fall_to(a1, pos)
  lib.totalAs++;
  lib.drawBigRing(c)

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

lib.createRing = function(subject) {

  function addA(angle, i){
    var newPos = lib.findCirclePosOffset(subject.angle, .05*i*i)
    var a1 = new lib.LetterA(newPos, 1);
    a1.render()
    lib.pageConstants.push(a1)

    var newPos = lib.findCirclePosOffset(subject.angle, .05*i*i*-1)
    var a2 = new lib.LetterA(newPos, 1);
    a2.render()
    lib.pageConstants.push(a2)
    console.log(i)

    i++;
    if(i < 8){
      setTimeout(function(){
        addA(angle, i);
      }, 50)
    }
  }

  addA(subject.angle, 0);
}

lib.drawBigRing = function(){
  console.log('asdf')
  var center = [300, 300];
  var c = lib.canvas;
  c.beginPath();
  c.arc(300,300,200,0,2*Math.PI);
  c.lineWidth = 14;
  var shadeOfRed = Math.floor(Math.random()*120)
  lib.oldRed = shadeOfRed;


  c.strokeStyle = "rgba(158, "+ shadeOfRed +", 22, 1)";
  c.stroke();
}

lib.findCirclePosOffset = function(startAngle, offset) {
  var center = [300, 300];
  var radius = 200;
  var angle = startAngle + offset;
  var x = Math.cos(angle)*radius;
  var y = Math.sin(angle)*radius;
  x = Math.round(x);
  y = Math.round(y);
  var newPos = [x + center[0], y + center[1]];
  return newPos;
}

lib.fall_to = function(subject, destination) {

  if( subject.streek == 0 ){
    subject.streek = Math.floor(Math.random() * 15) + 5

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

    if( Math.random() > .5){
      move[0] = 0
    }else{
      move[1] = 0
    }

    subject.currentMove = move
  }

  var currentMove = subject.currentMove;

  var closeEnough = Math.abs(destination[0] - subject.pos[0]) + Math.abs(destination[1] - subject.pos[1])
  if(closeEnough < 7){
    currentMove = [0, 0]
    subject.pos = destination
    lib.pageConstants.push(subject)
    // lib.createRing(subject)
    lib.drawBigRing();
    return
  }

  var c = lib.canvas;
  // c.clearRect(0, 0, canvas.width, canvas.height);
  subject.move(currentMove[0], currentMove[1])
  subject.streek--;
  subject.render(c)
  lib.drawPageConstants()
  requestAnimationFrame(function(){
    lib.fall_to(subject, destination)
  })
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
  return [x + center[0], y + center[1], angle]
}


lib.myAnimation = function(canvas){

  var c = canvas.getContext('2d');
  lib.canvas = c
  var a2 = new lib.LetterA([200, 200], 3);
  lib.fall(a2);

}



lib.LetterA = function(pos, size){
  this.size = size;
  this.pos = pos;
  this.angle = null
  this.streek = 0;
  this.currentMove = null
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
