$(document).ready(function() {
  const BPM = 400;

  const playIt = function(onComplete) {
    const afterLastSong = function() {
      playIt(onComplete);
    };
    // If there is at least one song left to play...
    if ($('#song-queue')[0].childElementCount > 0) {
      let song = parseSong($('#song-queue li span.song')[0].innerText);
      // If pause is clicked during play...
      if ($('#play-button').hasClass('clicked')) {
        doThisAfter();
        $('#play-button').removeClass('clicked')
        return;
      } else {
        $('#jukebox-message').html(`Now playing: ${$('.name')[0].innerText}`);
        playSong(song, BPM, afterLastSong);
      }
      // If repeat is turned on...
      if ($('#repeat-button').hasClass('btn-primary')) {
        $('#played-songs').append($('#song-queue')[0].firstElementChild);
        $('#played-songs li i, #played-songs li a').show();
      } else {
        $('#song-queue').append($('#song-queue')[0].firstElementChild);
      }
    } else {
      onComplete();
    }
  };

  const doThisBefore = function() {
    // $('#play-button').slideUp(500, playAllMusic);
    $('#play-button').addClass('pause').html('Pause');
    playAllMusic();
  };

  const playAllMusic = function() {
    playIt(doThisAfter);
  };

  const doThisAfter = function() {
    // $('#play-button').slideDown(500);
    $('#play-button').removeClass('pause').html('Play All');
    $('#jukebox-message').html(`Enter a song to play`);
  };

  // Add a song to the song list...
  $('#song-form').submit(function(event) {
    event.preventDefault();
    let currentCount = $('#song-queue li').length;
    let nextId = currentCount + 1;
    $('#song-queue').append(`<li id="song-${nextId}">
        <span class="name">${$("input[name='song-name']").val()}</span>
        <span class="song" style="display:none">${$("input[name='notes']").val()}</span>
        <i class="fa fa-trash pull-right" aria-hidden="true" style="display:none"></i>
        <a href="#" class="pull-right" style="display:none">Play Again</a>
      </li>`);
    $('input:text').val('');

  });

  // Show song notes...
  $(`#song-queue, #played-songs`).on('mouseenter', 'li', function(event) {
    let songElement = $(this).find('.song');
    songElement.fadeIn(500);
  });

  // Hide song notes...
  $(`#song-queue, #played-songs`).on('mouseleave', 'li', function(event) {
    let songElement = $(this).find('.song');
    songElement.fadeOut(500);
  });

  // Either pause or play songs...
  $('#play-button').on('click', function(event) {
    if ($('#play-button').hasClass('pause')) {
      $('#play-button').addClass('clicked')
    } else {
      doThisBefore();
    }
  });

  // Shortcut to start playing songs...
  // keyCode for spacebar is 32
  $(document).on('keydown', function(event) {
    let tag = event.target.tagName.toLowerCase();
    if (event.which === 32 && tag != 'input') {
      doThisBefore();
    }
  });

  // Trash...
  $(document).on('click', '#played-songs li i', function(event) {
    event.preventDefault();
    event.currentTarget.parentElement.remove();
  });

  // Play again...
  $(document).on('click', '#played-songs li a', function(event) {
    event.preventDefault();
    $('#song-queue').append(event.currentTarget.parentElement);
    $('#song-queue li i, #song-queue li a').hide();
  });

  // Toggle repeat button...
  $('#repeat-button').on('click', function(event) {
    if ($('#repeat-button').hasClass('btn-danger')) {
      $('#repeat-button').removeClass('btn-danger').addClass('btn-primary');
    } else {
      $('#repeat-button').removeClass('btn-primary').addClass('btn-danger');
    }
  });

});
