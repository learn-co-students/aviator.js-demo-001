function Balloon(id) {
  this.id = id;
  this.jQObj = $("#" + id);
  this.image = $("#" + id).children().first();
}
