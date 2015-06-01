var plane = new Plane();

$(document).keydown(function(e) {
  var code = (e.keyCode ? e.keyCode : e.which);
  if (code == 40) {
    plane.down();
  } else if (code == 38) {
    plane.up();
  }
  e.preventDefault();
});