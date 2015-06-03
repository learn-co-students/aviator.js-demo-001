function Sky() {
  this.html = '<div class="col-md-3"></div><div class="col-md-2" id="plane"><img src="public/images/plane.png" /></div><div class="balloon" id="balloon-1"><img src="public/images/balloon.png"/></div><div class="balloon" id="balloon-2"><img src="public/images/balloon.png"/></div><div class="balloon" id="balloon-3"><img src="public/images/balloon.png"/></div><div class="balloon" id="balloon-4"><img src="public/images/balloon.png"/></div><div class="cloud" id="cloud-1"></div><div class="cloud" id="cloud-2"></div><div class="cloud" id="cloud-3"></div><div class="cloud" id="cloud-4"></div><div class="cloud" id="cloud-5"></div><div class="cloud" id="cloud-6"></div>';
  this.plane = new Plane();
  this.statusBar = new StatusBar();
  this.balloons = this.makeBalloons();
  this.addKeyListener();
  this.addCollisionListener();
  this.life = 4;
}

Sky.prototype.restart = function() {
  $("body").off('keydown');
  $("#inner-sky").html('<div class="row center-this"><p>Restarting...</p></div>');
  var sky = this;
  setTimeout(function() {
    $(".progress").html('<div class="progress-bar progress-bar-success" role="progressbar" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100" style="width: 100%" id="status"><span class="sr-only"><span id="num-of-lives">4</span> life/lives left</span></div>');
    $("#inner-sky").html(sky.html);
    sky.plane = new Plane();
    sky.statusBar = new StatusBar();
    sky.balloons = sky.makeBalloons();
    sky.addCollisionListener();
    sky.life = 4;
  }, 1000);
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

Sky.prototype.explodeBalloon = function() {
  this.crashBalloon.explode();
}

Sky.prototype.processCollision = function() {
  this.explodeBalloon();
  this.life -= 1;
  this.statusBar.adjust(this.life);
  if (this.life <= 0) this.restart();
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
    if (collide) {
      collision = true;
      sky.crashBalloon = balloon;
    }
  });
  return collision;
}
