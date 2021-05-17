$(document).ready(function() {
// Change active 
  $('.nav').find('li.active').removeClass('active');
  var sPath = window.location.pathname;
  var sPage = sPath.substring(sPath.lastIndexOf('/') + 1);
  console.log(sPage);
  var aTag = $('.nav').find('a[href=' + sPage + ']').parents('li').addClass('active');
  
});


