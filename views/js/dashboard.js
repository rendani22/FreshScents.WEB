/* globals Chart:false, feather:false */

// (function () {
//   'use strict'

//   feather.replace()

//   // Graphs
//   var ctx = document.getElementById('myChart')
//   // eslint-disable-next-line no-unused-vars
//   var myChart = new Chart(ctx, {
//     type: 'line',
//     data: {
//       labels: [
//         'Sunday',
//         'Monday',
//         'Tuesday',
//         'Wednesday',
//         'Thursday',
//         'Friday',
//         'Saturday'
//       ],
//       datasets: [{
//         data: [
//           15339,
//           21345,
//           18483,
//           24003,
//           23489,
//           24092,
//           12034
//         ],
//         lineTension: 0,
//         backgroundColor: 'transparent',
//         borderColor: '#007bff',
//         borderWidth: 4,
//         pointBackgroundColor: '#007bff'
//       }]
//     },
//     options: {
//       scales: {
//         yAxes: [{
//           ticks: {
//             beginAtZero: false
//           }
//         }]
//       },
//       legend: {
//         display: false
//       }
//     }
//   })


// })()

$(document).ready(function() {
  let imagesPreview = function(input, placeToInsertImagePreview) {
    if (input) {
      let filesAmount = input.files.length;
      for (i = 0; i < filesAmount; i++) {
        let reader = new FileReader();
        reader.onload = function(event) {
    
          $($.parseHTML("<img>"))
            .attr("src", event.target.result)
            .appendTo(placeToInsertImagePreview);
        };
        reader.readAsDataURL(input.files[i]);
      }
    }
  };

$("#productImage").on("change", function (e) {

  var count=1;
  var files = e.currentTarget.files; // puts all files into an array
  
  document.getElementById("preview-image").innerHTML = '';
  // call them as such; files[0].size will get you the file size of the 0th file
  for (var x in files) {
    var fileSize = ((files[x].size/1024)/1024).toFixed(4); // MB
    if (files[x].name != "item" && typeof files[x].name != "undefined" && fileSize <= 1) { 
      imagesPreview(this, "div.preview-images");
      count++;
    } else if(!isNaN(fileSize)){
      alert('Image size is more then ' + fileSize + ' mb');
      return false;
    }
  }
  });
});


