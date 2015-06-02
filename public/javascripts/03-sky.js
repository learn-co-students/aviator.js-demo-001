function Sky() {
  this.plane = new Plane();
  this.balloons = this.makeBalloons();
  this.addKeyListener();
  this.addCollisionListener();
}

Sky.prototype.makeBalloons = function() {
  var balloons = [];
  $(".balloon").each( function(i, c) {
    var id = $(c).attr('id')
    var balloon = new Balloon(id);
    balloons.push(balloon);
  });
  return balloons;
}

Sky.prototype.planeUp = function() {
  this.plane.up();
}

Sky.prototype.planeDown = function() {
  this.plane.down();
}

Sky.prototype.addKeyListener = function() {
  var sky = this;
  $(document).keydown(function(e) {
    var code = (e.keyCode ? e.keyCode : e.which);
    if (code == 40) {
      sky.planeDown();
    } else if (code == 38) {
      sky.planeUp();
    }
  });
}

Sky.prototype.addCollisionListener = function() {
  var sky = this;
  sky.updateStatus();
  setTimeout(function() {
    sky.addCollisionListener();
  }, 200);
}

Sky.prototype.processCollision = function() {
  
}

Sky.prototype.updateStatus = function() {
  if (this.collisionCheck()) {
    this.processCollision();
  };
}

Sky.prototype.collision = function($div1, $div2) {
  var x1 = $div1.offset().left;
  var y1 = $div1.offset().top;
  var h1 = $div1.outerHeight(true);
  var w1 = $div1.outerWidth(true);
  var b1 = y1 + h1;
  var r1 = x1 + w1;
  var x2 = $div2.offset().left;
  var y2 = $div2.offset().top;
  var h2 = $div2.outerHeight(true);
  var w2 = $div2.outerWidth(true);
  var b2 = y2 + h2;
  var r2 = x2 + w2;
  if (b1 < y2 || y1 > b2 || r1 < x2 || x1 > r2) return false;
  return true;
}

Sky.prototype.collisionCheck = function() {
  var sky = this;
  var collision = false;
  this.balloons.forEach(function(balloon) {
    var collide = sky.collision(sky.plane.jQObj, balloon.jQObj);
    if (collide) collision = true;
  });
  return collision;
}
