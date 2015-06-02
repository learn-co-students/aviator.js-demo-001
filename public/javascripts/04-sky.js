function Sky() {
  this.plane = new Plane();
  this.clouds = this.makeClouds();
  this.balloons = this.makeBalloons();
  this.addKeyListener();
  this.addCollisionListener();
}

Sky.prototype.makeClouds = function() {
  var clouds = [];
  $(".cloud").each( function(i, c) {
    var id = $(c).attr('id')
    var cloud = new Cloud(id);
    clouds.push(cloud);
  });
  return clouds;
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
  }, 250);
}

Sky.prototype.updateStatus = function() {
  var text = "fine";
  if (this.collisionCheck()) text = "ahh!";
  $("#status").text(text);
}

Sky.prototype.collisionCheck = function() {
  var sky = this;
  var collision = false;
  this.balloons.forEach(function(balloon) {
    var balloonEle = $("#" + balloon.id);
    if (sky.plane.collision(balloonEle)) {
      collision = true;
    }
  });
  return collision;
}