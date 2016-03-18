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
