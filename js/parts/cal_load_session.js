
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
