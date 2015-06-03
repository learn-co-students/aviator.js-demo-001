function Balloon(id) {
  this.id = id;
  this.jQObj = $("#" + id);
  this.image = $("#" + id).children().first();
}

Balloon.prototype.explode = function() {
  this.image.effect("explode");
  this.jQObj.remove();
}
