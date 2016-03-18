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

  $('.open-popup-link').magnificPopup({
    type:'inline',
    midClick: true
  });
  $('.open-popup-link').trigger('click');

},
adjustPopinHeight : function(){
  var popinHeight = $('.popin').height();
  if(popinHeight > 300){
    $('.popin').css('margin-top',(popinHeight*-1)/2);
  }else{
    $('.popin').css('margin-top',(popinHeight*-1)/2);
  }
}
};
