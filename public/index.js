$(document).ready(() => {



});

var optionSelected;

function chargeForm(option) {

    console.log(option);

    optionSelected = option;

    var form = ' <form> ' +
        'Email:<br>' +
        '<input id="email" type="text" name="email" value="example@example.com">' +
        '<br>' +
        'Password:<br>' +
        '<input id="password" type="password" name="password" value="*****">' +
        '<br><br>' +
        '<div id="errorText">' + 
        '</div>' +
        '<input class="btn btn-info" type="button" value="Submit" onclick="submitData()">' +
        '</form>'

    $("#containerButtons").html(form);

}

function submitData() {

    if (optionSelected == "register")
        var url = "signUp";
    else
        var url = "signIn";

    console.log(document.getElementById("email"));
    console.log("/user/" + url);
    $.ajax({
        type: "POST",
        url: '/user/' + url,
        dataType : "json",
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify({
            email: document.getElementById("email").value,
            password: document.getElementById("password").value
        }),
        success: function (respond) {
            window.location="main.html?email=" + document.getElementById("email").value;
        },
        error: function (respond) {
            console.log("Error");
            $("#errorText").text("The inserted credentials are wrong");
            console.log(respond);
        }
    })
}