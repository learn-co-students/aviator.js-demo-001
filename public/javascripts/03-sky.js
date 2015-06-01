function Sky() {
  this.plane = new Plane();
  this.clouds = this.makeClouds();
  this.addListener();
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

Sky.prototype.planeUp = function() {
  this.plane.up();
}

Sky.prototype.planeDown = function() {
  this.plane.down();
}

Sky.prototype.addListener = function() {
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