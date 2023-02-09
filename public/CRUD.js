const mysql = require("mysql");


const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE
})




$(document).ready(function(){

    $("#categories").submit(function(e) {
        e.preventDefault();    
        var formData = new FormData(this);

        $.ajax({
            url: "http://localhost:3000/adminsIndex",
            type: 'POST',
            data: { action : "fetch"},
            success: function (data) {
                alert(data)
            },
            cache: false,
            contentType: false,
            processData: false
        });
    });


});
    


