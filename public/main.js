$.urlParam = function (name) {
    var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
    if (results == null) {
        return null;
    } else {
        return results[1] || 0;
    }
}


var favourites = [];

loadFavourites();


$(document).ready(function () {
    var altura = $('.filter').offset().top;

    $(window).on('scroll', function () {
        if ($(window).scrollTop() > altura) {
            $('.filter').addClass('menu-fixed');
            $('#information-fountain').removeClass('information-fountain');
            $('#information-fountain').addClass('information-fountain-scroll');
        } else {
            $('.filter').removeClass('menu-fixed');
            $('#information-fountain').removeClass('information-fountain-scroll');
            $('#information-fountain').addClass('information-fountain');
        }
    });

});

$.ajax({
    url: '/fountains',
    success: function (respuesta) {

        var id = "#fountains";
        var fountains = '';
        var limit = 50;
        if (respuesta.length < 50) limit = respuesta.length;
        for (var x = 0; x < limit; x++) {

            fountains = fountains + '<div>' +
                '<button class="button-fountain fountain" id="' + respuesta[x]._id + '" onclick="chargeInformation(this.id)">' +
                '<h3>' + respuesta[x].direccion + '</h3>' +
                '</button>' +
                '</div>'
        }

        $(id).html(fountains);
    },
    error: function (respond) {
        console.log("Error");
        console.log(respond);
    }
});

function loadInformationFountains() {
    $.ajax({
        url: '/fountains',
        success: function (respuesta) {

            var id = "#fountains";
            var fountains = '';
            var limit = 50;
            if (respuesta.length < 50) limit = respuesta.length;
            for (var x = 0; x < limit; x++) {

                fountains = fountains + '<div>' +
                    '<button class="button-fountain fountain" id="' + respuesta[x]._id + '" onclick="chargeInformation(this.id)">' +
                    '<h3>' + respuesta[x].direccion + '</h3>' +
                    '</button>' +
                    '</div>'
            }

            $(id).html(fountains);
        },
        error: function (respond) {
            console.log("Error");
            console.log(respond);
        }
    });
}


var openFountain;

function chargeInformation(info) {
    $.ajax({
        url: '/fountains/' + info,
        success: function (respuesta) {

            var id = "#information-fountain";

            var latitud = "";
            var longitud = "";

            latitud = respuesta.latitud;
            var longitud = respuesta.longitud;

            latitud = latitud.replace(/[.]/g, '');
            longitud = longitud.replace(/[.]/g, '');

            var numero = "";

            for (var x = 0; x < latitud.length; x++) {
                numero = numero + latitud.charAt(x);

                if (x == 1) {
                    numero += ".";
                }
            }

            latitud = numero;
            numero = "";

            for (var x = 0; x < longitud.length; x++) {
                numero = numero + longitud.charAt(x);

                if (x == 1) {
                    numero += ".";
                }
            }

            longitud = numero;

            var favourite = false;

            console.log(favourites);

            for (var x = 0; x < favourites.length; x++) {
                if (info == favourites[x]) {
                    favourite = true;
                }
            }

            console.log(favourite);

            $(id).css({
                'visibility': 'visible'
            });

            var information = '<h4> Direction: ' + respuesta.direccion + '</h4>' +
                '<h4> State: ' + respuesta.estado + '</h4>' +
                '<h5> Zone: ' + respuesta.zona + '</h5>' +
                '<h5> District: ' + respuesta.distrito + '</h5>' +
                '<h5> Latitude: ' + latitud + '</h5>' +
                '<h5> Longitude: ' + longitud + '</h5>' +

                '<div id="map"></div>' +
                '<script type="text/javascript"> initMap(' + latitud + ',' + longitud + ') </script>' +

                '<button> <a href="https://www.google.com/maps?q=' + latitud + ',' + longitud + '">HOW TO GO</a></button>'

            if (favourite == false) {
                information = information +
                    '<button class="button-favorite" id="favoriteButton_' + info + '" onclick="changeButtonFountain();"></button>';
            } else {
                information = information + '<button class="button-favorite button-favorite-on" id="favoriteButton_' + info + '" onclick="changeButtonFountain();"></button>';
            }

            openFountain = info;

            $(id).html(information);
        },
        error: function () {
            console.log("ERROR EN CARGA");
        }
    });

    console.log(info);

}

function initMap(latitude, longitude) {
    // The location of Uluru
    /*var fountain1 = {lat: 40.4272429, lng: -3.7086003};
    var fountain2 = {lat: 40.4287238, lng: -3.7101008}*/

    var fountain = {
        lat: latitude,
        lng: longitude
    }

    console.log(fountain);

    // The map, centered at Uluru
    var map = new google.maps.Map(
        document.getElementById('map'), {
            zoom: 18,
            center: fountain
        });
    // The marker, positioned at Uluru
    /*var marker = new google.maps.Marker({position: fountain1, map: map});
    var marker = new google.maps.Marker({position: fountain2, map: map});*/

    var marker = new google.maps.Marker({
        position: fountain,
        map: map
    });

}

var active = false;

document.getElementById("favorite").onclick = function () {
    myFunction()
};

function myFunction() {

    if (active == false) {
        $('#favorite').addClass('button-favorite-on');
        favoriteFountains();
        active = true;
    } else {
        $('#favorite').removeClass('button-favorite-on');
        loadInformationFountains();
        active = false;
    }
}

function changeButtonFountain() {

    var found = false;

    for (var x = 0; x < favourites.length && found == false; x++) {
        if (favourites[x] == openFountain) {
            $('#favoriteButton_' + openFountain).removeClass('button-favorite-on');
            setEliminateFavourite(openFountain);
            found = true;
        }
    }
    console.log(found);
    if (found == false) {
        $('#favoriteButton_' + openFountain).addClass('button-favorite-on');
        setEliminateFavourite(openFountain);
    }
}


var selectedLetter;
var selectedDistrict;
var selectedPlace;
var selectedService;

function startFilter() {

    console.log("ME HE EJECUTADO");

    $districts = $("#District");
    $.ajax({
        url: '/fountains/districts',
        success: function (res) {
            for (i = 0; i < res.length; ++i) {
                $districts.append("<option value=\"" + res[i] + "\">" + res[i] + "</option>");
            }
            console.log(res);
        },
        error: function () {
            console.log("error loading fountain's districts")
        }
    });

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
    $('#fountains').empty();

    var selectedPlace = $('#Place').children('option:selected').val();
    var selectedDistrict = $('#District').children('option:selected').val();
    var selectedService = $('#Service').children('option:selected').val();

    var url = "/fountains/";
    var first = true;
    var values = [selectedDistrict, selectedPlace, selectedService];
    var names = ["distrito", "zona", "estado"];
    for (i = 0; i < values.length; ++i) {
        if (values[i] != " ") {
            if (first) {
                first = false;
                url += "?";
            } else {
                url += "&";
            }
            url += names[i] + "=" + values[i];
        }
    }

    console.log(url);

    $.ajax({
        url: url,
        success: function (respuesta) {
            console.log(respuesta);
            var id = "#fountains";
            var fountains = '';
            var limit = 50;
            if (respuesta.length < 50) limit = respuesta.length;
            for (var x = 0; x < limit; x++) {

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
            console.log("error loading fountain's districts")
        }
    });

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

function loadFavourites() {
    $.ajax({
        type: "GET",
        url: "/user/favourites/?email=" + $.urlParam("email"),
        sync: true,
        success: function (respond) {

            favourites = [];

            for (var x = 0; x < respond.favourites.length; x++) {
                favourites.push(respond.favourites[x]);
            }

        },
        error: function (respond) {
            console.log("Error");
            console.log(respond);
        }
    })
}

function setEliminateFavourite(id) {
    $.ajax({
        type: "POST",
        url: "/user/favourites/" + id + "/?email=" + $.urlParam("email"),
        success: function (respond) {},
        error: function (respond) {
            console.log("Error");
            console.log(respond);
        }
    })
}

function favoriteFountains() {


    loadFavourites();

    $.ajax({
        type: "GET",
        url: '/fountains',
        success: function (respond) {
            var id = "#fountains";
            var fountains = '';

            var found = false;

            for (var x = 0; x < favourites.length; x++) {

                for (var y = 0; y < respond.length && found == false; y++) {

                    if (favourites[x] == respond[y]._id) {
                        found = true;

                        fountains = fountains + '<div>' +
                            '<button class="button-fountain fountain" id="' + respond[y]._id + '" onclick="chargeInformation(this.id)">' +
                            '<h3>' + respond[y].direccion + '</h3>' +
                            '</button>' +
                            '</div>'
                    }
                }
                console.log(found);
                found = false;

            }

            $(id).html(fountains);
        },
        error: function (respond) {
            console.log("Error");
            console.log(respond);
        }

    });
}