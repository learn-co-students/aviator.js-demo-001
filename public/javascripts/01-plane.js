function Plane() {
  this.jQObj = $("#plane");
}

Plane.prototype.up = function() {
  var margin = this.getMargin() - 5;
  if (margin < -100) margin = -100;
  this.setMargin(margin);
}

Plane.prototype.down = function() {
  var margin = this.getMargin() + 5;
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
