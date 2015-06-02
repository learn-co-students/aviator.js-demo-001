function Balloon(id) {
  this.id = id;
  this.jQObj = $("#" + id);
  this.image = $("#" + id).children().first();
}

Balloon.prototype.explode = function() {
  var $balloon = this.jQObj;
  var statusBar = $('#status');
  // get position of the element we clicked on
  var offset = statusBar.offset();
  
  // get width/height of click element
  var h = statusBar.outerHeight();
  var w = statusBar.outerWidth();
  
  // get width/height of drop element
  var dh = $balloon.outerHeight();
  var dw = $balloon.outerWidth();
  
  // determine middle position
  var initLeft = offset.left + ((w/2) - (dw/2));

  $balloon.css({
    left: initLeft,
    top: $(window).scrollTop() - dh,
    opacity: 0,
    display: 'block'
  }).animate({
    left: initLeft,
    top: offset.top - dh,
    opacity: 1
  }, 300, 'easeOutBounce');
  
  var balloon = this;
  setTimeout(function() {
    balloon.jQObj.remove();
  }, 1000);
}