$(document).ready(function(){
  /*********************************** HELPER FUNCTIONS ********************************************************
  **************************************************************************************************************/

  //params is a map
  var addParams = function(baseURL, params){
    if(!params){
      return baseURL;
    }

    var url = baseURL + '?';
    $.each(params, function(key, value){
      url += `&${key}=${value}`
    });

    return url;
  }

  //attrs is a map
  var buildEventURL = function(eci, eid, domain, type, attrs){
    var baseURL =  `${config.protocol}${config.server_host}/sky/event/${eci}/${eid}/${domain}/${type}`;
    return addParams(baseURL, attrs)
  }

  //params is a map
  var buildQueryURL = function(eci, rid, funcName, params){
    var baseURL =  `${config.protocol}${config.server_host}/sky/cloud/${eci}/${rid}/${funcName}`;
    return addParams(baseURL, params);
  }

  /******************************* END HELPER FUNCTIONS ***********************************************************
  *****************************************************************************************************************/


  /*********************************** FUNCTION DECLARATIONS ******************************************************
  *****************************************************************************************************************/

  var updateData = function(){
    $.ajax({
      url: buildQueryURL(config.default_eci, config.profile_rid, config.profile_func),
      dataType: 'json',
      success: function(json){
        console.log("Retrieved profile data!", json);

        let name = json['name'];
        let location = json['location']
        let contact = json['contact'];
        let threshold = json['threshold'];

        $('#name').html(`<p>${name}</p>`);
        $('#location').html(`<p>${location}</p>`);
        $('#contact').html(`<p>${contact}</p>`);
        $('#threshold').html(`<p>${threshold} F</p>`);
      },
      error: function(error){
        console.error(error);
      }
    });
  };

  var changeData = function(attrs){
    let url = buildEventURL(config.default_eci, "changeData", "sensor", "profile_updated", attrs);
    console.log("url:",url);
    $.ajax({
      url: url,
      dataType: 'json',
      success: function(json){
        console.log(json);
        updateData();
      },
      error: function(error){
        console.error(error);
      }
    });
  };

  /******************************* END FUNCTION DECLARATIONS ******************************************************
  *****************************************************************************************************************/

  //run on load functions
  updateData();

  //set up buttons
  /*Your name, location, phone number, and threshold variables may be named differently in your krl code,
  be sure to change the code accordingly*/
  $('#setName').click(function(e){
    e.preventDefault();
    changeData({
      "new_sensor_name": $('#newName').val()
    });
  });

  $('#setLocation').click(function(e){
    e.preventDefault();
    console.log($('#newlocation').val());
    changeData({
      "new_location": $('#newlocation').val()
    });
  });

  $('#setContact').click(function(e){
    e.preventDefault();
    console.log($('#newContact').val());
    changeData({
      "new_send_to": $('#newContact').val()
    });
  });

  $('#setThreshold').click(function(e){
    e.preventDefault();
    changeData({
      "new_threshold": $('#newThreshold').val()
    });
  });
});
