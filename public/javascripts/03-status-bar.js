function StatusBar() {
  this.jQObj = $("#status");
  this.levels = ["progress-bar-danger", "progress-bar-warning", "progress-bar-info", "progress-bar-success"];
  this.livesLeft = 4;
}

StatusBar.prototype.adjust = function(lives) {
  this.livesLeft = lives;
  this.changeClass();
  this.changeWidth();
  this.changeLivesLeft();
}

StatusBar.prototype.changeLivesLeft = function() {
  $("#num-of-lives").html(this.livesLeft);
}

StatusBar.prototype.changeWidth = function() {
  var width = (this.livesLeft / 3 * 100);
  if (width < 10) width = 2;
  this.jQObj.css("width", width + "%");
}

StatusBar.prototype.changeClass = function() {
  this.removeOldClass();
  this.addNewClass();
}

StatusBar.prototype.addNewClass = function() {
  var newClass = this.levels[this.livesLeft - 1];
  this.jQObj.addClass(newClass);
}

StatusBar.prototype.removeOldClass = function() {
  if (!(this.jQObj.hasClass("progress-bar-danger"))) {
    var classList = this.jQObj.attr('class').split(/\s+/);
    var statusBar = this;
    $.each(classList, function(i, item){
      var index = statusBar.levels.indexOf(item);
      if (index != -1) {
        statusBar.jQObj.removeClass(statusBar.levels[index]);
      }
    });
  }
}
