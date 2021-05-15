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

var table = document.getElementById('productList');
var cells = table.getElementsByTagName('td');

for(var i = 0; i<cells.length; i++){
  cells[i].onclick = function(){
    if(this.hasAttribute('data-clicked')){
      return;
    }

    this.setAttribute('data-clicked', 'yes');
    this.setAttribute('data-text', this.innerHTML);

    var attributeType = this.className;

    if(attributeType == "select"){
      var input = document.createElement(attributeType);
      var trueOption = document.createElement("option");
      trueOption.text = "true";
      var falseOption = document.createElement("option");
      falseOption.text = "false";
      input.add(trueOption);
      input.add(falseOption); 
      console.log('s');
    }else{
      var input = document.createElement('input');
      input.setAttribute('type',attributeType);
    }
    input.value = this.innerHTML;
    input.style.width = this.offsetWidth - (this.clientLeft * 2) + "px";
    input.style.height = this.offsetHeight - (this.clientTop * 2) + "px";
    input.style.border = "0px";
    input.style.fontFamily = "inherit";
    input.style.fontSize = "inherit";
    input.style.textAlign = "inherit";
    input.style.backgroundColor = "#f5d370";

    input.onblur = async function (){
      var td = input.parentElement;
      var originalText = input.parentElement.getAttribute('data-text');
      var currentText = this.value; 
      var originalPadding = this.style.cssText;

      if(originalText != currentText){
        let productID = td.parentElement.id,
            columnName = td.id;
        //Save to db
        
        await updateProductDetails(productID,columnName,currentText,td)
        td.removeAttribute('data-clicked');
        td.removeAttribute('data-text');
        td.innerHTML = currentText;
        td.style.cssText = ".25rem .25rem";
      } else{
        td.removeAttribute('data-clicked');
        td.removeAttribute('data-text');
        td.innerHTML = originalText;
        td.style.cssText = ".25rem .25rem";
      }
    }

    input.onkeypress = function(){
      if(event.keyCode == 13){this.blur();}
    }

    this.innerHTML = '';
    this.style.cssText = 'padding: 0px 0px';
    this.append(input);

  }
}


async function updateProductDetails (productId,columnName,newValue,element){
      var settings = {
    "async": true,
    "crossDomain": true,
    "url": `http://localhost:8080/update/${productId}`,
    "method": "PATCH",
    "headers": {
      "content-type": "application/x-www-form-urlencoded",
      "cache-control": "no-cache",
      "postman-token": "83ffd42e-fffb-f6ee-4371-0f9f750bb13d"
    },
    "data": {
      [columnName]: newValue
    }
  }
  $.ajax(settings).done(function (response) {
        if(response.success){element.style.backgroundColor = "#3ed42c";}
        else{
          element.style.backgroundColor = "#dc3545";
          alert(`Product detail failed to updated`)}
  });
  
}

