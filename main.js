$(document).ready(function () {
    var altura = $('.filter').offset().top;

    $(window).on('scroll', function () {
        if ($(window).scrollTop() > altura) {
            $('.filter').addClass('menu-fixed');
        } else {
            $('.filter').removeClass('menu-fixed');
        }
    });

});

$.ajax({
    url: 'http://127.0.0.1:3000/fountains',
    success: function (respuesta) {

        var id = "#fountains";
        var fountains = '';

        for(var x = 0; x < 50; x++) {

            fountains = fountains + '<div>' +
            '<button class="button-fountain fountain" id="' + respuesta[x]._id + '" onclick="chargeInformation(this.id)">' +
                '<h3>' + respuesta[x].direccion + '</h3>' +
            '</button>' + 
        '</div>'
        }

        console.log("HE TERMINADO");

        $(id).html(fountains);
    },
    error: function () {
        console.log("ERROR EN CARGA");
    }
});


function chargeInformation (info) {
    $.ajax({
        url: 'http://127.0.0.1:3000/fountains/' + info,
        success: function (respuesta) {
    
            var id = "#information-fountain";

            $(id).css({ 'visibility': 'visible' });

            var information = '<h4> Direction: ' + respuesta.direccion + '</h4>' + 
            '<h4> State: ' + respuesta.estado + '</h4>' +
            '<h5> Zone: ' + respuesta.zona + '</h5>' + 
            '<h5> District: ' + respuesta.distrito + '</h5>' +
            '<h5> Coordinate X: ' + respuesta.coord_x + '</h5>' + 
            '<h5> Coordanate Y: ' + respuesta.coord_y + '</h5>' +
            '<button> <a href="https://www.google.com/maps?q=40.4272429,-3.7086003">HOW TO GO</a></button>' + 
            '<button class="button-favorite" id="favorite-fountain" onclick="changeButton-fountain"></button>'

            $(id).html(information);
        },
        error: function () {
            console.log("ERROR EN CARGA");
        }
    });

    console.log(info);

}

var active = false;

document.getElementById("favorite").onclick = function () {
    myFunction()
};

function myFunction() {

    if (active == false) {
        $('#favorite').addClass('button-favorite-on');
        active = true;
    } else {
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
    function () {
        selectedLetter = this.options[selectLetter.selectedIndex];
        console.log(selectedLetter.value + ': ' + selectedLetter.text);
    });


var selectDistrict = document.getElementById('District');
selectDistrict.addEventListener('change',
    function () {
        selectedDistrict = this.options[selectDistrict.selectedIndex];
        console.log(selectedDistrict.value + ': ' + selectedDistrict.text);
    });

var selectPlace = document.getElementById('Place');
selectPlace.addEventListener('change',
    function () {
        selectedPlace = this.options[selectPlace.selectedIndex];
        console.log(selectedPlace.value + ': ' + selectedPlace.text);
    });


var selectService = document.getElementById('Service');
selectService.addEventListener('change',
    function () {
        selectedService = this.options[selectService.selectedIndex];
        console.log(selectedService.value + ': ' + selectedService.text);
    });


function createJson() {

    var datos = [];
    var objeto = {};

    datos.push({
        "letter": selectedLetter.value,
        "district": selectedDistrict.value,
        "place": selectedPlace.value,
        "service": selectedService.value
    });

    objeto.datos = datos;
    console.log(JSON.stringify(objeto));

    $("#res").text(JSON.stringify(objeto));
}