Instapoll = {
  init: function() {
    $('a.add-item').click(Instapoll.addItemField);
    $('form').on('click', 'a.remove-item', Instapoll.removeItemField);
    $('form').has('input[required]').submit(Instapoll.validateForm);
    $('ul.items li a').click(Instapoll.selectItem);
    $('#vote_form').submit(Instapoll.submitVote);
    Instapoll.clearFlash();
  },
  addItemField: function(e) {
    e.preventDefault();
    $('input[name^=name]:first').clone().insertBefore($(this)).val('').focus().after('<a href="#" class="remove-item"><i class="icon-minus"></i></a>');
  },
  removeItemField: function(e) {
    e.preventDefault();
    $(this).prev('input').remove();
    $(this).remove();
  },
  selectItem: function(e) {
    e.preventDefault();
    var item = $(this).data('item');
    $('ul.items li a').removeClass('active');
    $(this).addClass('active');
    $('#vote_form button').toggleClass('enabled', $('ul.items li a.active').length > 0);
  },
  submitVote: function(e) {
    var item = $('ul.items li a.active');
    if(item.length > 0)
      $('input[name=item_id]').val(item.data('item'));
    else {
      e.preventDefault();
      $('section form').find('p.flash').remove().end().prepend('<p class="flash err">Please choose an item.</p>');
      Instapoll.clearFlash();
    }
  },
  addVote: function(message) {
    var list_item = $('ul.items li[data-item='+message.data.item+']');
    if(list_item.length) {
      socket.get('/item/'+message.data.item, function(item) {
        list_item.data('vote-count',item.votes.length);
        list_item.find('span').text(item.votes.length);
        $('ul.items li[data-vote-count]').sort(function(a, b) {
          return parseInt($(b).data('vote-count')) - parseInt($(a).data('vote-count'));
        }).appendTo('ul.items');

        Instapoll.drawBars();
      });
    }
  },
  drawBars: function() {
    var vote_arr = $('ul.items li[data-vote-count]').map(function(){ return $(this).data('vote-count') }).get();
    var total_votes = _.reduce(vote_arr, function(sum, votes){ return sum + votes });
    $('ul.items').data('total-votes', total_votes);
    $('ul.items li[data-vote-count]').each(function() {
      var w = $(this).width();
      var item_w = $(this).find('.item').width() + 15;
      var bgsize = ($(this).data('vote-count') / total_votes) * 100;
      $(this).find('.bg').css('width', bgsize+'%');
      $(this).find('.item').toggleClass('lite', (item_w / w) * 100 <= bgsize);
    });
  },
  pollAdded: function(message) {
    $('ul.polls').prepend('<li style="display: none;"><a href="/poll/cast/'+message.data.id+'">'+message.data.title+'</a></li>').find('li:first').fadeIn('fast');
    $('ul.polls li:eq(4) ~ li').remove();
  },
  clearFlash: function() {
    $('p.flash').delay(5000).slideUp('fast');
  },
  validateForm: function(e) {
    if(!$(this).validate()) {
      e.preventDefault();
      $('section form').find('p.flash').remove().end().prepend('<p class="flash err">Please complete all fields.</p>');
      Instapoll.clearFlash();
    }
  }
};

$(document).ready(function() {
  Instapoll.init();
});

// the simplest validation plugin ever?
(function ( $ ) {
  $.fn.validate = function() {
    this.find('[required]').each(function() {
      $(this).removeClass('error');
      if($(this).val() === '')
        $(this).addClass('error');
    });
    return this.find('[required].error').length === 0;
  };
}( jQuery ));
