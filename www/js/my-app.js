// Initialize your app
  var myApp = new Framework7({
  		cache:true
  });

  // Export selectors engine
  var $$ = Dom7;

  // Add view
  var mainView = myApp.addView('.view-main', {
      // Because we use fixed-through navbar we can enable dynamic navbar
      dynamicNavbar: true
  });

  var calendarDefault = myApp.calendar({
      input: '#calendar-default',
  });  

  function getData(){
  var storedData = myApp.formGetData('userprofile-form');
  if(storedData) {
    var JsonString = JSON.stringify(storedData)
    var parseObject = JSON.parse(JsonString);
    alert(parseObject.profession);
  }
  else {
    alert('There is no stored data for this form yet. Try to change any field')
  }
}

function test(){
  window.open('http://apache.org', '_system','toolbar=no,location=no');
}

//Get parameters from URL
var getUrlParameter = function getUrlParameter(sParam) {
    var sPageURL = decodeURIComponent(window.location.search.substring(1)),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : sParameterName[1];
        }
    }
};

function fDate(){
	 $('.ks-facebook-date').text(function () {
    			return $(this).text().replace('T', ' '); 
		});
}

// Generate dynamic page
var dynamicPageIndex = 0;
function createContentPage() {
  mainView.router.loadContent(
      '<!-- Top Navbar-->' +
      '<div class="navbar">' +
      '  <div class="navbar-inner">' +
      '    <div class="left"><a href="#" class="back link"><i class="icon icon-back"></i><span>Back</span></a></div>' +
      '    <div class="center sliding">Dynamic Page ' + (++dynamicPageIndex) + '</div>' +
      '  </div>' +
      '</div>' +
      '<div class="pages">' +
      '  <!-- Page, data-page contains page name-->' +
      '  <div data-page="dynamic-pages" class="page">' +
      '    <!-- Scrollable page content-->' +
      '    <div class="page-content">' +
      '      <div class="content-block">' +
      '        <div class="content-block-inner">' +
      '          <p>Here is a dynamic page created on ' + new Date() + ' !</p>' +
      '          <p>Go <a href="#" class="back">back</a> or go to <a href="services.html">Services</a>.</p>' +
      '        </div>' +
      '      </div>' +
      '    </div>' +
      '  </div>' +
      '</div>'
    );
  return;
}



var rootURL = 'https://www.selibeng.com/wp-json/wp/v2';

$.ajax({
  // type: 'GET',
  url: rootURL + '/posts?filter[posts_per_page]=400',
  // dataType: 'json',
  success: function(data){
      
      $.each(data, function(index, value) {
        $$('#content-block-main').append('<div class="card ks-facebook-card">' +
          '<div class="card-header">' +
              '<div class="ks-facebook-avatar"><img src="img/selibeng.png" width="34" height="34"/></div>' +
              '<div class="ks-facebook-name">Selibeng.com</div>' +
              '<div class="ks-facebook-date">'+value.date+'</div>' +
            '</div>' +
            '<div class="card-content">' + 
              '<div class="card-content-inner">' +
               '<p>'+value.title.rendered+'</p>' +
                //'<p class="more-content">Views: '+value.link+'</p>' +
              '</div>' +
            '</div>' +
            '<div class="card-footer">' +
            '<a  href="whatsapp://send?text='+value.link+'" class="button item-link external"><img src="img/whatsapp_share.png" height="20px" style="margin-top:8px;"></a>'+
            '<a  href="posts.html?postid='+value.id+'" class="button item-link external">View</a></div>' +
          '<div class="item-inner"><div class="item-title"></div>');
       //console.log(parseObject.profession);
        //console.log(value.id);
        //Remove T from Date format
        fDate();
      });
  },
  complete: function(){
        $('#loader-image').hide();
      },
  error: function(error){
      $$('.content-block-main').append('<div class="item-content">' + 
          '<div class="item-title"><div class="item-media"></div><center><img style="height:350px" src="img/error.gif"/><br/><a class="button button-raised button-fill color-teal item-link external" style="width:50%;" onClick="location.reload()">No Internet Press to Refresh</a></center></div>');
      console.log(error);
  }

});

 
  var postid = getUrlParameter('postid');
  if (postid != null){
     $.ajax({
      // type: 'GET',
      url: rootURL + '/posts/'+postid,
      // dataType: 'json',
      success: function(data){
        $$('.post-content-block').append('<div class="card ks-facebook-card">' +
          '<div class="card-header">' +
              '<div class="ks-facebook-avatar"><img src="img/selibeng.png" width="34" height="34"/></div>' +
              '<div class="ks-facebook-name">Selibeng.com</div>' +
              '<div class="ks-facebook-date">'+data.date+'</div>' +
            '</div>' +
            '<div class="card-content">' + 
              '<div class="card-content-inner">' +
              '<p><h3>'+data.title.rendered+'</h3></p>' +
               '<p>'+data.content.rendered+'</p>' +
               '<p class="buttons-row"><a href="'+data.link+'" class="button button-raised button-fill color-teal item-link external" style="font-weight:bold;">Read More</a><a  href="whatsapp://send?text='+data.link+'" style="text-align:center;font-weight:bold;" class="button button-raised button-fill color-teal item-link external">Share Post</a></p>'+
                // '<p class="color-gray">Views: '+value.link+'</p>' +
              '</div>' +
            '</div>' +
          '<div class="item-inner"><div class="item-title"></div>');
        //console.log(value.title);
        fDate();
        $$('a').addClass('external');
      },
      complete: function(){
        $('#loader-spinner').hide();
      },
      error: function(error){
          $$('.post-content-block').append('<div class="item-content">' + 
              '<div class="item-title"><div class="item-media"></div><center><img style="height:350px" src="img/error.gif"/><br/><a class="button button-raised button-fill color-teal item-link external" style="width:50%;" onClick="location.reload()">No Internet Press to Refresh</a></center></div>');
      console.log(error);
      }
  });
};

//Implement Search Filter 

//ovewrite JQuery Case Sensitive
jQuery.expr[':'].contains = function(a, i, m) {
  return jQuery(a).text().toUpperCase()
      .indexOf(m[3].toUpperCase()) >= 0;
};
//Then Search
var search_txt = $('#search-input').val();
$('#search-input').keyup( function(){
    $('.card').hide();
   var search_txt = $('#search-input').val();
   $('.card:contains("'+search_txt+'")').show();
   //show notification if results are empty
   if($('.card:contains("'+search_txt+'")').length === 0){
      myApp.addNotification({
        title: 'Results - Tap to Remove',
        closeIcon: true,
        closeOnClick: true,
          message: 'No Results Found for your Search',
          button: {
            text: 'Close',
            color: 'white',
            close:true
          }
      });
   }
});

//Check update
var updateVersion = 0;
var currentVersion = 0; //need to connect to device API (suspended for now)
var updateURL = window.location;
$.ajax({
  url: updateURL + '/app-params.json',
  success: function(data){
        updateVersion = data.jUpdateVersion;
        if(updateVersion > currentVersion){
	      myApp.addNotification({
	        title: 'New Update Available',
	        closeIcon: true,
	        closeOnClick: true,
	        close:true,
	          message: '<a href="http://spane.nsgplesotho.com/spane.apk" class="link external">Click here to <b>Download</b> new App version</a>',
	          button: {
	            text: 'Close',
	            color: 'white',
	            close:true
	          }
	      });
	   }
	   console.log(updateVersion);
  },
  error: function(error){
     console.log(error);
  }

});

//check network status
function checkConnection() {
    var networkState = navigator.connection.type;

    var states = {};
    states[Connection.UNKNOWN]  = 'Unknown connection';
    states[Connection.ETHERNET] = 'Ethernet connection';
    states[Connection.WIFI]     = 'WiFi connection';
    states[Connection.CELL_2G]  = 'Cell 2G connection';
    states[Connection.CELL_3G]  = 'Cell 3G connection';
    states[Connection.CELL_4G]  = 'Cell 4G connection';
    states[Connection.CELL]     = 'Cell generic connection';
    states[Connection.NONE]     = 'No network connection';

    alert('Connection type: ' + states[networkState]);
}

document.getElementById("openBrowser").addEventListener("click", openBrowser);
function openBrowser() {
   var url = 'https://cordova.apache.org';
   var target = '_self';
   var options = "location = yes"
   var ref = cordova.InAppBrowser.open(url, target, options);
   
   ref.addEventListener('loadstart', loadstartCallback);
   ref.addEventListener('loadstop', loadstopCallback);
   ref.addEventListener('loadloaderror', loaderrorCallback);
   ref.addEventListener('exit', exitCallback);

   function loadstartCallback(event) {
      console.log('Loading started: '  + event.url)
   }

   function loadstopCallback(event) {
      console.log('Loading finished: ' + event.url)
   }

   function loaderrorCallback(error) {
      console.log('Loading error: ' + error.message)
   }

   function exitCallback() {
      console.log('Browser is closed...')
   }
}

// $$('a').addClass('external');