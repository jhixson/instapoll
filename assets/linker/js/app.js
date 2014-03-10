/**
 * app.js
 *
 * This file contains some conventional defaults for working with Socket.io + Sails.
 * It is designed to get you up and running fast, but is by no means anything special.
 *
 * Feel free to change none, some, or ALL of this file to fit your needs!
 */


(function (io) {

  // as soon as this file is loaded, connect automatically, 
  var socket = io.connect();
  if (typeof console !== 'undefined') {
    log('Connecting to Sails.js...');
  }

  socket.on('connect', function socketConnected() {
    bars();

    // Listen for Comet messages from Sails
    socket.on('message', function messageReceived(message) {

      ///////////////////////////////////////////////////////////
      // Replace the following with your own custom logic
      // to run when a new message arrives from the Sails.js
      // server.
      ///////////////////////////////////////////////////////////
      log('New comet message received :: ', message);
      //////////////////////////////////////////////////////

    });

    socket.on('vote', function(message) {
      log(message);
      switch (message.verb) {
        case 'created':
          addVote(message);
          break;

        default:
          break;
      }
    });

    socket.get('/vote/subscribe');

    socket.get('/vote', function(votes) {
      log(votes);
    });

    $('ul.items li a').click(function(e) {
      e.preventDefault();
      var item = $(this).data('item');
      $('ul.items li a').removeClass('active');
      $(this).addClass('active');
      $('#vote_form button').toggleClass('enabled', $('ul.items li a.active').length > 0);
      /*
      $.post('/vote', {item_id: item}, function(data) {
        log(data);
        window.location.href = "/";
      });
      */
    });

    $('#vote_form').submit(function(e) {
      var item = $('ul.items li a.active');
      if(item.length > 0)
        $('input[name=item_id]').val(item.data('item'));
      else
        e.preventDefault();
    });

    ///////////////////////////////////////////////////////////
    // Here's where you'll want to add any custom logic for
    // when the browser establishes its socket connection to 
    // the Sails.js server.
    ///////////////////////////////////////////////////////////
    log(
        'Socket is now connected and globally accessible as `socket`.\n' + 
        'e.g. to send a GET request to Sails, try \n' + 
        '`socket.get("/", function (response) ' +
        '{ console.log(response); })`'
    );
    ///////////////////////////////////////////////////////////


  });


  // Expose connected `socket` instance globally so that it's easy
  // to experiment with from the browser console while prototyping.
  window.socket = socket;


  // Simple log function to keep the example simple
  function log () {
    if (typeof console !== 'undefined') {
      console.log.apply(console, arguments);
    }
  }
  

})(

  // In case you're wrapping socket.io to prevent pollution of the global namespace,
  // you can replace `window.io` with your own `io` here:
  window.io

);
