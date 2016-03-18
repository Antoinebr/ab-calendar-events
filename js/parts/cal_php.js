  $('.calendar').first().addClass('first');
  $('.calendar').last().addClass('last');

  $('table').first().toggleClass('tab-hide');

  $('.next').click(function(e){
    e.preventDefault();
    var $calendar = $(this).closest('.calendar');
    if($calendar.hasClass('last')) return false;
    $calendar.toggleClass('tab-hide');
    $calendar.next().toggleClass('tab-hide');

  });

  $('.prev').click(function(e){
    e.preventDefault();
    var $calendar = $(this).closest('.calendar');
    if($calendar.hasClass('first')) return false;
    $calendar.toggleClass('tab-hide');
    $calendar.prev().toggleClass('tab-hide');
  });
