function Plane() {
  this.jQObj = $("#plane");
}

Plane.prototype.up = function() {
  var margin = this.getMargin() - 20;
  if (margin < -100) margin = -100;
  this.setMargin(margin);
}

Plane.prototype.down = function() {
  var margin = this.getMargin() + 20;
  if (margin > 225) margin = 225;
  this.setMargin(margin);
}

Plane.prototype.setMargin = function(margin) {
  var marginString = margin + "px";
  this.jQObj.css("margin-top", marginString);
}

Plane.prototype.getMargin = function() {
  var margin = this.jQObj.css("margin-top");
  return parseInt(margin, 10);
}

Plane.prototype.collision = function(cloud) {
  var plane = this.jQObj;
  var x1 = plane.offset().left;
  var y1 = plane.offset().top;
  var h1 = plane.outerHeight(true);
  var w1 = plane.outerWidth(true);
  var b1 = y1 + h1;
  var r1 = x1 + w1;
  var x2 = cloud.offset().left;
  var y2 = cloud.offset().top;
  var h2 = cloud.outerHeight(true);
  var w2 = cloud.outerWidth(true);
  var b2 = y2 + h2;
  var r2 = x2 + w2;
  if (b1 < y2 || y1 > b2 || r1 < x2 || x1 > r2) return false;
  return true;
}