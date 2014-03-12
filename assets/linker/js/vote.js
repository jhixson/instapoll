function addVote(message) {
  var list_item = $('ul.items li[data-item='+message.data.item+']');
  if(list_item.length) {
    socket.get('/item/'+message.data.item, function(item) {
      list_item.data('vote-count',item.votes.length);
      list_item.find('span').text(item.votes.length);
      $('ul.items li[data-vote-count]').sort(function(a, b) {
        return parseInt($(b).data('vote-count')) - parseInt($(a).data('vote-count'));
      }).appendTo('ul.items');

      bars();
    });
  }
}

function bars() {
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
}