jQuery(function($){

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

// récupère les sessions du CPT session entre dateEnd et dateStart
var getSession = {
  init : function(){
    this.sendRequest();
  },
  sendRequest : function(){
    that = this;
    $.ajax({
      type: "POST",
      url: ajaxurl,
      dataType : 'json',
      async: true,
      timeout:5000,
      data:{
        action: 'get_session',
        dateEnd: "20401201",
        dateStart: "20100401"
      },
      success: function(response){
        // console.log('RESP -> '+response);
        that.fillCalendar(response);

      },
      error : function(request, errorType, errorMessage){
        console.log(request);
        console.log(errorType);
        console.log(errorMessage);
      },
      beforeSend: function(){
        console.log("before rqst");
        // $('#comments-btn').after("<i id='ajax-loader' class='fa fa-refresh fa-spin fa-2x ajax-loader'></i>");
      },
      complete:function(){
        //$('#ajax-loader').remove();
      }
    });
  },
  fillCalendar : function(ajaxData){
    InjectCalendar.init(ajaxData);
  }
};

// Si on est sur une page avec le calendar

if( $('.calendar').length > 0) getSession.init();

// Injecte les dates récupéré par getSession dans le datepicker
var InjectCalendar = {
  myAjax : null,
  init : function(ajaxData){
    this.setCalendar(ajaxData);
  },
  setCalendar : function(ajaxData){
    console.log(ajaxData); // ajaxData contient les dates et les id des posts
    for(i = 0; i < ajaxData.length; i++){ // on boucle sur l'objet pour créer 2 autres object (eventDate et session)
    // console.log(ajaxData[i].id);
    var year = ajaxData[i].date.slice(0,4);
    var month = ajaxData[i].date.slice(4,6);
    var day = ajaxData[i].date.slice(6,8);

    var dateComplete = month+'/'+day+'/'+year;

    var dateClass = '.'+year+month+day;
    console.log(dateClass);

    if($(dateClass).attr('data-session') !== ""){ // si une session est deja rentrée
      var sessionAlreadyAdded = $(dateClass).attr('data-session'); // on récupère la session deja en place
      $(dateClass).addClass('multiple-session').attr('data-session',sessionAlreadyAdded+' '+ajaxData[i].id); // on ajoute une class speciale et on rajoute l'id

    }else{
      $(dateClass).addClass('session').attr('data-session',ajaxData[i].id);
    }

  }
  this.listenClickLoadSession();
},
listenClickLoadSession : function(){
  var that = this;
  $('.calendar .days td').on('click',function(){
    var sessionId = $(this).data('session');

    if(sessionId === "") return false; // si le click est sur une date vide on retourne

    if(that.isMultipleSession(sessionId)){
      var sessionArray = that.sliceSessionId(sessionId);
      loadSession.sendRequest(sessionArray);
    }else{
      loadSession.sendRequest(sessionId);
    }

    that.firePopin();
  });
},
isMultipleSession : function(element){
  if( typeof(element) == 'string' && element.length > 0){
    return true;
  }else{
    return false;
  }
},
sliceSessionId : function(sessionId){
  var sessionsArray = sessionId.split(' ').map(Number); // /!\ Attention support old browser !
  return sessionsArray;
},
firePopin : function(){



},
adjustPopinHeight : function(){

}
};


// Envoie une requête pour récupérer les infos d'une session
// Cette requête renvoit un objet contenant les infos
// fillPopin remplis une popin et la déclenhce après que les infos ai été injecté dans le doc
var loadSession = {

  sendRequest : function(postId){
    that = this;
    $.ajax({
      type: "POST",
      url: ajaxurl,
      dataType : 'json',
      async: true,
      timeout:5000,
      data:{
        action: 'load_session',
        postId: postId
      },
      success: function(response){
        that.fillPopin(response);
      },
      error : function(request, errorType, errorMessage){
        console.log(request);
        console.log(errorType);
        console.log(errorMessage);
      },
      beforeSend: function(){
        $('#ajax-loader').show();
        $('.pop-i').remove();
        //alert('Avant la requête AJAX');
        // $('#comments-btn').after("<i id='ajax-loader' class='fa fa-refresh fa-spin fa-2x ajax-loader'></i>");
      },
      complete:function(){
        $('#ajax-loader').hide();
      }
    });
  },
  isSingleResponse : function(response){
    if(response.single === true){
      return true;
    }else{
      return false;
    }
  },
  fillSinglePopin : function(response){
    $('.pop-i').remove();
    console.log("___RESP____");
    console.log(response);
    console.log("_______");

    var popinTemplate = $('#popin-template').html();
    $('.popin-container .popin').append(Mustache.render(popinTemplate,response));
    this.pop('abce-popin');
  },
  fillMultiplePopin : function(response){
    $('.pop-i').remove();

  },
  fillPopin : function(response){

    if(response.isMultiple){
      this.fillMultiplePopin(response);
    }else{
      this.fillSinglePopin(response);
    }

  },
  // Popin
  pop: function(div) {
    document.getElementById(div).style.display='block';
    return false;
  },
  hide: function(div) {
    document.getElementById(div).style.display='none';
    return false;
  }
};

}); // document ready
