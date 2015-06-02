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
  $(".ballon").each( function(i, c) {
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
  setTimeout(function() {
    if (sky.collisions) alert("ahhh!");
    return sky.addCollisionListener();
  }, 500);
}

Sky.prototype.collisions = function() {
  // var sky = this;
  // var collision = false;
  // this.balloons.forEach(function(cloud) {
  //   var cloudEle = $("#" + cloud.id);
  //   if (sky.plane.collision(cloudEle)) {
  //     console.log("collides with" + cloud.id);
  //     collision = true;
  //   }
  // });
  // return collision;
  return false;
}