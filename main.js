$(document).ready(function(){
    var altura = $('.filter').offset().top;
    
    $(window).on('scroll', function(){
        if ( $(window).scrollTop() > altura ){
            $('.filter').addClass('menu-fixed');
        } else {
            $('.filter').removeClass('menu-fixed');
        }
    });
 
});


var active = false;

document.getElementById("favorite").onclick = function() {myFunction()};

function myFunction() {

    if(active == false) {
        $('#favorite').addClass('button-favorite-on');
        active = true;
    }

    else {
        $('#favorite').removeClass('button-favorite-on');
        active = false;
    }
}


var selectedLetter;
var selectedDistrict;
var selectedPlace;
var selectedService;

function startFilter() {

    console.log("ME HE EJECUTADO");

    selectedLetter = "null";
    selectedDistrict = "null";
    selectedPlace = "null";
    selectedService = "null";
}

  var selectLetter = document.getElementById('Letter');
selectLetter.addEventListener('change',
  function(){
    selectedLetter = this.options[selectLetter.selectedIndex];
    console.log(selectedLetter.value + ': ' + selectedLetter.text);
  });


  var selectDistrict = document.getElementById('District');
selectDistrict.addEventListener('change',
  function(){
    selectedDistrict = this.options[selectDistrict.selectedIndex];
    console.log(selectedDistrict.value + ': ' + selectedDistrict.text);
  });

  var selectPlace = document.getElementById('Place');
selectPlace.addEventListener('change',
  function(){
    selectedPlace = this.options[selectPlace.selectedIndex];
    console.log(selectedPlace.value + ': ' + selectedPlace.text);
  });


  var selectService = document.getElementById('Service');
selectService.addEventListener('change',
  function(){
    selectedService = this.options[selectService.selectedIndex];
    console.log(selectedService.value + ': ' + selectedService.text);
  });


  function createJson () {

    var datos  = [];
    var objeto = {};
    
    datos.push({ 
            "letter"    : selectedLetter.value,
            "district"  : selectedDistrict.value,
            "place"    : selectedPlace.value,
            "service" : selectedService.value
        });
    
    objeto.datos = datos;
    console.log(JSON.stringify(objeto));
    
    $("#res").text(JSON.stringify(objeto));
  }