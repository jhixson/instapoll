Instapoll = {
  init: function() {
    $('a.add-item').click(Instapoll.addItemField);
  },
  addItemField: function(e) {
    e.preventDefault();
    $('input[name^=name]:first').clone().insertBefore($(this)).val('').focus();
  }
};

$(document).ready(function() {
  Instapoll.init();
});